📰 AI Fake News Detector
An AI-powered fake news detection web application that analyzes news articles using Natural Language Processing (NLP) and Machine Learning, provides confidence-aware predictions, and helps users verify information responsibly using trusted sources.

🚀 Features


AI-based classification of news articles as REAL, FAKE, or UNCERTAIN


Confidence score to indicate prediction reliability


Uncertainty handling to avoid overconfident or misleading results


Topic-based source suggestions for cross-checking news


Satire detection to flag humorous or parody content


Modern UI with dark mode and mobile-friendly design



🧠 How It Works


User pastes a full news article into the web interface


Text is sent to the backend API


Backend forwards the text to an AI service


The AI model:


Preprocesses the text


Converts it to numerical features using TF-IDF


Predicts whether the news is REAL, FAKE, or UNCERTAIN


Returns a confidence score




The frontend displays:


Prediction result


Confidence bar


Relevant verification sources





🏗️ Tech Stack
Frontend


React.js


Responsive UI with dark mode


Backend


Node.js


Express.js


AI / ML Service


Python


FastAPI


Scikit-learn


TF-IDF Vectorizer


Logistic Regression



📊 Dataset


Public Fake/True news dataset (Kaggle)


Labeled news articles used for supervised learning



⚠️ Dataset files are included for development purposes only.


⚠️ Important Disclaimer
This application does NOT verify real-world facts.


The model analyzes linguistic and stylistic patterns, not live information.


Predictions are probabilistic, not absolute.


Users are encouraged to cross-check news using trusted sources, especially for uncertain results.


This project follows responsible AI principles.

▶️ Running the Project Locally
1️⃣ Start AI Service
cd ai-service
venv\Scripts\activate
uvicorn main:app --reload --port 8000

2️⃣ Start Backend
cd backend
npm install
node index.js

3️⃣ Start Frontend
cd frontend
npm install
npm start

Open in browser:
👉 http://localhost:3000

🎯 Why This Project Matters


Demonstrates end-to-end AI system development


Shows understanding of machine learning limitations


Combines AI, backend, and frontend engineering


Designed with ethical and responsible AI practices



📌 Future Improvements


Deployment on cloud platforms


Improved topic classification


Multi-language support


Model calibration and tuning



👤 Author
Anshika
AI & Full-Stack Development Enthusiast

⭐ Final Note
This project is intended as a decision-support tool, not a fact-checking authority.
It encourages critical thinking and verification, rather than blind trust in AI.