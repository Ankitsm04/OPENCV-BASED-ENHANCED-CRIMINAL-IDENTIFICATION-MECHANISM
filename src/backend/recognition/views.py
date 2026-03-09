import os
import zipfile
import cv2
import numpy as np
import pickle

from rest_framework.decorators import api_view
from rest_framework.response import Response
from insightface.app import FaceAnalysis


DATASET_DIR = "recognition/dataset/train"
MODEL_PATH = "recognition/models/face_model.pkl"

# Load ArcFace model once
app = FaceAnalysis(name="buffalo_l")
app.prepare(ctx_id=0)

def apply_low_light(image):

    alpha = 0.4
    beta = -30

    return cv2.convertScaleAbs(image, alpha=alpha, beta=beta)

def apply_occlusion(image):

    h, w = image.shape[:2]

    x1 = int(w * 0.3)
    y1 = int(h * 0.3)
    x2 = int(w * 0.6)
    y2 = int(h * 0.6)

    image[y1:y2, x1:x2] = 0

    return image


def augment_dataset(dataset_path):

    for person in os.listdir(dataset_path):

        person_dir = os.path.join(dataset_path, person)

        for img_name in os.listdir(person_dir):

            img_path = os.path.join(person_dir, img_name)

            image = cv2.imread(img_path)

            if image is None:
                continue

            name = img_name.lower()

            # Apply augmentation only to FRONT image
            if "front" in name:

                aug = apply_low_light(image.copy())
                aug = apply_occlusion(aug)

                base = img_name.split(".")[0]

                cv2.imwrite(
                    os.path.join(person_dir, base + "_aug.jpg"),
                    aug
                )

@api_view(["POST"])
def upload_dataset(request):

    if "dataset" not in request.FILES:
        return Response({"error": "Dataset zip required"})

    dataset_file = request.FILES["dataset"]

    import shutil

    # Clean old dataset
    if os.path.exists(DATASET_DIR):
        shutil.rmtree(DATASET_DIR)

    os.makedirs(DATASET_DIR, exist_ok=True)

    zip_path = "dataset.zip"

    with open(zip_path, "wb") as f:
        for chunk in dataset_file.chunks():
            f.write(chunk)

    # Extract zip to temp folder
    temp_dir = "temp_dataset"

    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)

    os.makedirs(temp_dir)

    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(temp_dir)

    # Detect if zip has root folder
    extracted_items = os.listdir(temp_dir)

    if len(extracted_items) == 1 and os.path.isdir(os.path.join(temp_dir, extracted_items[0])):
        source_dir = os.path.join(temp_dir, extracted_items[0])
    else:
        source_dir = temp_dir

    # Move person folders into DATASET_DIR
    for person in os.listdir(source_dir):

        src = os.path.join(source_dir, person)
        dst = os.path.join(DATASET_DIR, person)

        shutil.move(src, dst)

    # Apply augmentation
    augment_dataset(DATASET_DIR)

    return Response({
        "message": "Dataset uploaded and augmented successfully",
        "persons": len(os.listdir(DATASET_DIR))
    })


# STEP 2: Train
def cosine_similarity(a, b):

    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


@api_view(["POST"])
def train(request):

    print("===== TRAINING STARTED =====")

    embedding_db = {}

    identities = os.listdir(DATASET_DIR)

    print("Found identities:", identities)

    total_images = 0

    for identity in identities:

        person_dir = os.path.join(DATASET_DIR, identity)

        if not os.path.isdir(person_dir):
            continue

        print(f"\nProcessing person: {identity}")

        embeddings = []

        images = os.listdir(person_dir)

        print(f"Images found: {len(images)}")

        for img_name in images:

            img_path = os.path.join(person_dir, img_name)

            print("Reading:", img_path)

            image = cv2.imread(img_path)

            if image is None:
                print("Skipped (image read failed)")
                continue

            faces = app.get(image)

            print("Faces detected:", len(faces))

            if len(faces) > 0:
                embeddings.append(faces[0].embedding)
                total_images += 1

        if len(embeddings) > 0:

            embedding_db[identity] = np.mean(embeddings, axis=0)

            print(f"Embeddings created for {identity}")

        else:
            print(f"No faces detected for {identity}")

    if total_images == 0:
        return Response({
            "error": "No faces found in dataset"
        })

    os.makedirs("recognition/models", exist_ok=True)

    with open(MODEL_PATH, "wb") as f:
        pickle.dump(embedding_db, f)

    print("\n===== TRAINING COMPLETED =====")
    print("Total processed images:", total_images)
    print("Total identities:", len(embedding_db))

    return Response({
        "message": "Training completed",
        "identities": len(embedding_db),
        "images_processed": total_images
    })


# STEP 3: Predict
@api_view(["POST"])
def predict(request):

    if "image" not in request.FILES:
        return Response({"error": "Image required"})

    with open(MODEL_PATH, "rb") as f:
        embedding_db = pickle.load(f)

    image_file = request.FILES["image"]

    file_bytes = np.frombuffer(image_file.read(), np.uint8)

    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    faces = app.get(image)

    if len(faces) == 0:
        return Response({"error": "No face detected"})

    emb = faces[0].embedding

    best_score = -1
    best_identity = "Unknown"

    for identity, db_emb in embedding_db.items():

        score = cosine_similarity(emb, db_emb)

        if score > best_score:
            best_score = score
            best_identity = identity

    if best_score < 0.25:
        best_identity = "Unknown"

    return Response({
        "identity": best_identity,
        "score": float(best_score),
        "percentage": round(best_score * 100, 2)
    })