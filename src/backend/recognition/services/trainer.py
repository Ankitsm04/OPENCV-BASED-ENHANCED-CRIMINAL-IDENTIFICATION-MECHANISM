import os
import cv2
import numpy as np
import pickle
from insightface.app import FaceAnalysis

app = FaceAnalysis(name="buffalo_l")
app.prepare(ctx_id=0)

MODEL_PATH = "recognition/models/face_model.pkl"

def train_model(dataset_path):

    embedding_db = {}

    identities = os.listdir(dataset_path)

    for identity in identities:

        person_dir = os.path.join(dataset_path, identity)

        embeddings = []

        for img_name in os.listdir(person_dir):

            img_path = os.path.join(person_dir, img_name)

            image = cv2.imread(img_path)

            faces = app.get(image)

            if len(faces) > 0:
                embeddings.append(faces[0].embedding)

        if len(embeddings) > 0:
            embedding_db[identity] = np.mean(embeddings, axis=0)

    with open(MODEL_PATH, "wb") as f:
        pickle.dump(embedding_db, f)

    return len(embedding_db)