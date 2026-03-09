import cv2
import os
import numpy as np
import pickle
from insightface.app import FaceAnalysis

# FaceAnalysis loads the InsightFace pipeline
# Internally this includes:
# RetinaFace for face detection
# ArcFace Deep Learning Model for embeddings

app = FaceAnalysis(name="buffalo_l")
app.prepare(ctx_id=0)

MODEL_PATH = "models/face_model.pkl"

# Face Embedding Extraction
# Pipeline:
# Image → Face Detection (RetinaFace)
#       → ArcFace Model → 512-D embedding

def get_embedding(image):

    faces = app.get(image)  # internally uses RetinaFace detector

    if len(faces) == 0:
        return None

    # ArcFace embedding vector
    return faces[0].embedding

# Cosine Similarity
# Measures similarity between two embeddings
def cosine_similarity(a, b):

    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Face Matching
# Compare query embedding with stored database
def match_face(query_embedding, db, threshold=0.6):

    best_score = -1
    best_identity = "Unknown"

    for identity, emb in db.items():

        score = cosine_similarity(query_embedding, emb)

        if score > best_score:
            best_score = score
            best_identity = identity

    if best_score < threshold:
        return "Unknown", best_score

    return best_identity, best_score