# Fake News Detector 📰

A full-stack web application that uses **Natural Language Processing (NLP)** and **Machine Learning** to classify news articles as **Real, Fake, or Uncertain**, along with a **confidence score** to support responsible decision-making.

This project focuses on **practical AI integration**, not blind automation.

---

## 🔍 What This Project Does
- Accepts a news article as input
- Analyzes linguistic and stylistic patterns using ML
- Predicts:
  - **Real**
  - **Fake**
  - **Uncertain** (low confidence)
- Displays a **confidence score** to avoid over-trust in predictions

> ⚠️ This system does **not** verify live facts or real-time news sources.

---

## 🚀 Features
- Machine-learning–based text classification  
- Confidence score indicating prediction reliability  
- Explicit handling of uncertain predictions  
- Clean, responsive React UI  
- Clear separation of frontend, backend, and AI service  
- API-based architecture (scalable & modular)

---

## 🧠 How It Works
1. User submits a news article via the web interface  
2. Frontend sends request to backend API  
3. Backend forwards text to AI service  
4. ML model processes text using **TF-IDF**
5. **Logistic Regression** generates prediction and confidence score  
6. Result is returned and displayed to the user  

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
- Public **Fake & Real News** dataset (Kaggle)
- Supervised learning using labeled news articles  
- Dataset included for **learning and development purposes only**

---

## ⚡ Quick Start

### Clone the Repository
```bash
git clone https://github.com/anshicaa/fake-news-detector.git
cd fake-news-detector
