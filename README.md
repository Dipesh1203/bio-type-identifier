
# 🧬 BioIDScan | [Live Link](https://bio-type-identifier.vercel.app/)

BioIDScan is a web-based biometric analysis system that utilizes deep learning models to analyze fingerprint patterns and predict blood groups. It features a sleek, responsive frontend and a robust backend powered by Flask and TensorFlow.

---

## ✨ Features

### 🔍 Fingerprint Analysis
- Drag-and-drop image upload with preview
- Supports multiple formats (`.jpg`, `.jpeg`, `.png`, etc.)
- Client-side validation (file type, size ≤ 5MB)
- Real-time error handling

### 📊 Results Display
- Predicts fingerprint type: **Arch**, **Loop**, **Whorl**
- Predicts **Blood Group** with confidence
- Visual indicators and pattern match display

### 📁 History Management
- Tracks previous analyses with timestamps
- Local storage-based history
- Allows single record deletion or full clearing

### 🎨 User Interface
- Responsive design with mobile support
- Interactive particle background
- Smooth transitions, professional UI

---

## 🖥️ Tech Stack

### Frontend
- **React 18.3.1** with **TypeScript**
- **Tailwind CSS 3.4.1**
- **React Router 6.22.2**
- **Lucide React** for icons
- **Vite 5.4.2** for bundling

### Backend
- **Flask** + **TensorFlow**
- **CORS** enabled
- Deep learning models for fingerprint and blood group classification

---

## 📁 Project Structure

### Frontend

```
src/
├── components/
│   ├── analysis/               # Image upload and result display
│   ├── layout/                 # Navbar, Footer
│   └── ui/                     # Particle background
├── context/                    # Global state (FingerprintContext)
├── pages/                      # Routing pages
└── main.tsx                    # App entry point

```

### Backend
```

backend/
├── app.py                      # Flask app with routes
├── model/
│   ├── bloodgroup\_fingerprint\_model-3.keras
│   ├── fingerprint\_model.keras
│   ├── label\_encoder.pkl
│   └── label\_encoder-2.pkl

````

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.8+
- pip or conda (for Python dependencies)

---

## 🔧 Frontend Setup

1. **Clone the repository**:
```bash
git clone https://github.com/yourusername/BioIDScan.git
cd BioIDScan
````

2. **Install dependencies**:

```bash
npm install
```

3. **Run the frontend**:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🧠 Backend Setup (Flask + ML Models)

1. **Navigate to the backend directory**:

```bash
cd backend
```

2. **(Optional) Create a virtual environment**:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. **Install Python dependencies**:

```bash
pip install -r requirements.txt
```

4. **Ensure the models are in the `model/` directory**:

```
backend/
├── model/
│   ├── bloodgroup_fingerprint_model-3.keras
│   ├── fingerprint_model.keras
│   ├── label_encoder.pkl
│   └── label_encoder-2.pkl
```

5. **Run the Flask server**:

```bash
python app.py
```

The API will be available at `http://localhost:5000`

---

## 🧪 API Endpoints

| Method | Endpoint               | Description                    |
| ------ | ---------------------- | ------------------------------ |
| POST   | `/predict_bloodgroup`  | Predict blood group from image |
| POST   | `/predict_fingerprint` | Predict fingerprint pattern    |

> Send `multipart/form-data` with a file field named `image`.

---

## 🔐 Security Notes

* All processing is done client-side or in memory
* No sensitive data is stored or transmitted
* Local storage is used for history tracking

---

## 🚧 Limitations

* Models use simulated training for concept demonstration
* No database or cloud integration
* No user authentication (yet)
* Local-only history persistence

---

## 🔮 Future Enhancements

* ✅ Integrate real ML model APIs
* 🔐 Add user authentication
* ☁️ Store analysis history in cloud database
* 🖨 Export and download results
* 🧬 Advanced fingerprint analysis
* 🗂 Batch image processing

---
