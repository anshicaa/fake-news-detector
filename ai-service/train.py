import pandas as pd
import re
import pickle
import os

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load datasets
fake = pd.read_csv("Fake.csv")
real = pd.read_csv("True.csv")

fake["label"] = 0
real["label"] = 1

# Combine & shuffle
df = pd.concat([fake, real])
df = df.sample(frac=1).reset_index(drop=True)

# Text cleaning function
def clean(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-z\s]", "", text)
    return text

df["text"] = df["text"].apply(clean)

X = df["text"]
y = df["label"]

# Vectorization
vectorizer = TfidfVectorizer(stop_words="english", max_df=0.7)
X_vec = vectorizer.fit_transform(X)

# Train model
model = LogisticRegression(max_iter=1000)
model.fit(X_vec, y)

# Ensure model folder exists
os.makedirs("model", exist_ok=True)

# Save trained artifacts
with open("model/model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("model/vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("Model trained and saved successfully")

