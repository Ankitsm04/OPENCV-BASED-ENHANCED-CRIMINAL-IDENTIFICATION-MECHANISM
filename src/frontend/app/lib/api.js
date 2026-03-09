const BASE_URL = "http://127.0.0.1:8000/api";

export async function uploadDataset(file) {
  const formData = new FormData();
  formData.append("dataset", file);

  const res = await fetch(`${BASE_URL}/upload-dataset/`, {
    method: "POST",
    body: formData
  });

  return res.json();
}

export async function trainModel() {
  const res = await fetch(`${BASE_URL}/train/`, {
    method: "POST"
  });

  return res.json();
}

export async function predictFace(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/predict/`, {
    method: "POST",
    body: formData
  });

  return res.json();
}