# Setup Instructions

Follow the steps below to set up and run the project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/Ankitsm04/OPENCV-BASED-ENHANCED-CRIMINAL-IDENTIFICATION-MECHANISM.git
cd OPENCV-BASED-ENHANCED-CRIMINAL-IDENTIFICATION-MECHANISM
```

---

# Backend Setup (Django)

## 2. Navigate to Backend Directory

```bash
cd src/backend
```

## 3. Create Virtual Environment

```bash
python -m venv venv
```

## 4. Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

## 5. Install Required Dependencies

```bash
pip install -r requirements.txt
```

## 6. Run Django Server

```bash
python manage.py runserver
```

The backend API will start at:

```
http://127.0.0.1:8000
```

---

# Frontend Setup (Next.js)

## 7. Navigate to Frontend Directory

Open a **new terminal** and run:

```bash
cd src/frontend
```

## 8. Install Node Modules

```bash
npm install
```

## 9. Run Frontend Development Server

```bash
npm run dev
```

The frontend application will start at:

```
http://localhost:3000
```

---

# Running the Full System

1. Start the **Django backend server**.
2. Start the **Next.js frontend server**.
3. Open the frontend in your browser.
4. Upload an image or video to test **face detection and recognition**.

---

# Notes

* Ensure Python (3.9+) and Node.js (18+) are installed.
* Keep both **backend and frontend servers running simultaneously**.
* The system uses **OpenCV, RetinaFace, and ArcFace** for face detection and recognition.
* Ensure the trained model and dataset folders are correctly placed before running predictions.
