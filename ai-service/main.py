import pickle
import re
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

model = pickle.load(open("model/model.pkl", "rb"))
vectorizer = pickle.load(open("model/vectorizer.pkl", "rb"))

class NewsInput(BaseModel):
    text: str

def clean(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"\d+", "", text)
    text = re.sub(r"[^a-z\s]", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

@app.get("/")
def root():
    return {"status": "AI service running"}

@app.post("/predict")
def predict_news(data: NewsInput):
    cleaned = clean(data.text)
    vector = vectorizer.transform([cleaned])

    probs = model.predict_proba(vector)[0]
    fake_prob = probs[0]
    real_prob = probs[1]

    # Decision logic
    if real_prob >= 0.6:
        label = "REAL"
        confidence = real_prob
    elif fake_prob >= 0.6:
        label = "FAKE"
        confidence = fake_prob
    else:
        label = "UNCERTAIN"
        confidence = max(real_prob, fake_prob)

    return {
        "prediction": label,
        "confidence": round(float(confidence), 2),
        "real_probability": round(float(real_prob), 2),
        "fake_probability": round(float(fake_prob), 2)
    }

