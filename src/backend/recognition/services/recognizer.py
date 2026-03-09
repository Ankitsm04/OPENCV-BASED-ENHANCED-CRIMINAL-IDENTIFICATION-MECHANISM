import cv2
import numpy as np
import pickle
from insightface.app import FaceAnalysis

MODEL_PATH = "recognition/models/face_model.pkl"

app = FaceAnalysis(name="buffalo_l")
app.prepare(ctx_id=0)

def predict_face(image):

    with open(MODEL_PATH, "rb") as f:
        embedding_db = pickle.load(f)

    faces = app.get(image)

    if len(faces) == 0:
        return {"error": "No face detected"}

    emb = faces[0].embedding

    best_score = -1
    best_identity = "Unknown"

    for identity, db_emb in embedding_db.items():

        score = np.dot(emb, db_emb) / (
            np.linalg.norm(emb) * np.linalg.norm(db_emb)
        )

        if score > best_score:
            best_score = score
            best_identity = identity

    if best_score < 0.6:
        best_identity = "Unknown"

    return {
        "identity": best_identity,
        "score": float(best_score),
        "percentage": round(best_score * 100, 2)
    }