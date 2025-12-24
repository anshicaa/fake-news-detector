import pickle
import re
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Load trained model & vectorizer
model = pickle.load(open("model/model.pkl", "rb"))
vectorizer = pickle.load(open("model/vectorizer.pkl", "rb"))

class NewsInput(BaseModel):
    text: str

def clean(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-z\s]", "", text)
    return text

@app.get("/")
def root():
    return {"status": "AI service running"}

@app.post("/predict")
def predict_news(data: NewsInput):
    cleaned_text = clean(data.text)
    vector = vectorizer.transform([cleaned_text])

    prediction = model.predict(vector)[0]
    probability = model.predict_proba(vector)[0].max()

    return {
        "prediction": "REAL" if prediction == 1 else "FAKE",
        "confidence": round(float(probability), 2)
    }
