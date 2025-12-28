# Fake News Detector 📰

A full-stack web application that uses **Natural Language Processing (NLP)** and **Machine Learning** to classify news articles as **Real**, **Fake**, or **Uncertain**, along with a confidence score to support responsible decision-making.

This project focuses on **practical AI integration in real-world applications**, not blind automation.

---

## 🚀 Features
- Machine learning–based text classification
- Confidence score indicating prediction reliability
- Handles uncertain predictions to avoid overconfidence
- Clean and responsive user interface
- Clear separation of frontend, backend, and AI service

---

## 🧠 How It Works
1. User submits a news article through the web interface  
2. Request is sent to the backend API  
3. Backend forwards text to the AI service  
4. The ML model processes text using TF-IDF  
5. Prediction result and confidence score are returned to the frontend  

> ⚠️ The model analyzes linguistic and stylistic patterns only.  
> It does **not** verify real-time facts or live news sources.

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Responsive UI

### Backend
- Node.js
- Express.js

### AI / ML Service
- Python
- FastAPI
- Scikit-learn
- TF-IDF Vectorizer
- Logistic Regression

---

## 📊 Dataset
- Public Fake and Real News dataset (Kaggle)
- Supervised learning using labeled news articles

> Dataset files are included for development and learning purposes only.

---

## ▶️ Running the Project Locally

### 1️⃣ Start AI Service
```bash
cd ai-service
venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

### 2️⃣ Start Backend
```bash
cd backend
npm install
node index.js
```

### 3️⃣ Start Frontend
```bash
cd frontend
npm install
npm start
```
Open your browser and visit:
👉 http://localhost:3000

---

## 🎯 Why This Project

-Demonstrates end-to-end full-stack development with AI integration
-Shows understanding of machine learning limitations
-Uses API-based architecture for scalability
-Emphasizes responsible and ethical AI usage

---

## 👤 Author

Anshika

BCA Student | Full-Stack Development with AI Integration

---

## ⚠️ Disclaimer

This application is a decision-support tool, not a fact-checking authority.
Users should always verify information using trusted and reliable sources

