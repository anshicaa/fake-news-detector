import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSatire = (content) => {
    const words = ["satire", "parody", "joke", "humor", "meme"];
    return words.some(w => content.toLowerCase().includes(w));
  };

  const wordCount = text.trim().split(/\s+/).length;

  const checkNews = async () => {
    if (wordCount < 80) {
      setError("Please paste a full article (at least 80 words).");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/check-news",
        { text }
      );
      setResult(res.data);
    } catch {
      setError("Server error. Ensure backend and AI service are running.");
    }

    setLoading(false);
  };

  const badgeColor = (prediction) => {
    if (prediction === "REAL") return "#2ecc71";
    if (prediction === "FAKE") return "#e74c3c";
    return "#f1c40f";
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>AI Fake News Detector</h1>
        <p style={styles.subtitle}>
          An AI-assisted system that analyzes writing patterns and helps users
          verify news responsibly.
        </p>

        <textarea
          rows="7"
          placeholder="Paste a full news article here (80+ words recommended)..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={checkNews} style={styles.button}>
          {loading ? "Analyzing..." : "Check News"}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {result && (
          <div style={styles.resultBox}>
            <span
              style={{
                ...styles.badge,
                backgroundColor: badgeColor(result.prediction),
              }}
            >
              {result.prediction}
            </span>

            <p style={styles.confidenceText}>
              Confidence: {Math.round(result.confidence * 100)}%
            </p>

            <div style={styles.barBackground}>
              <div
                style={{
                  ...styles.barFill,
                  width: `${Math.round(result.confidence * 100)}%`,
                  backgroundColor: badgeColor(result.prediction),
                }}
              />
            </div>

            {!isSatire(text) && (
              <div style={styles.sources}>
                <p style={styles.sourcesTitle}>
                  {result.prediction === "UNCERTAIN"
                    ? "The model is uncertain. Cross-checking is strongly recommended:"
                    : "You may verify this assessment using reliable news sources:"}
                </p>

                <ul>
                  <li>
                    <a href="https://www.thehindu.com" target="_blank" rel="noreferrer">
                      The Hindu
                    </a>
                  </li>
                  <li>
                    <a href="https://news.google.com" target="_blank" rel="noreferrer">
                      Google News
                    </a>
                  </li>
                  <li>
                    <a href="https://www.reuters.com" target="_blank" rel="noreferrer">
                      Reuters
                    </a>
                  </li>
                </ul>
              </div>
            )}

            {isSatire(text) && (
              <p style={styles.satireWarning}>
                ⚠️ This content appears to be satire or humor.
              </p>
            )}

            <p style={styles.disclaimer}>
              This system analyzes linguistic patterns, not real-world facts.
              Always verify important information independently.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2f3, #d9e2ec)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: 12,
    padding: 30,
    width: "100%",
    maxWidth: 800,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: 5,
  },
  subtitle: {
    color: "#555",
    marginBottom: 20,
  },
  textarea: {
    width: "100%",
    padding: 12,
    fontSize: 14,
    borderRadius: 8,
    border: "1px solid #ccc",
    resize: "vertical",
  },
  button: {
    marginTop: 15,
    padding: "10px 20px",
    borderRadius: 8,
    border: "none",
    background: "#4a6cf7",
    color: "#fff",
    fontSize: 15,
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  resultBox: {
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    background: "#f9fafb",
  },
  badge: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  confidenceText: {
    marginTop: 10,
    marginBottom: 6,
  },
  barBackground: {
    width: "100%",
    height: 10,
    background: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
  },
  sources: {
    marginTop: 20,
  },
  sourcesTitle: {
    fontWeight: "bold",
  },
  satireWarning: {
    marginTop: 15,
    color: "#b36b00",
    fontWeight: "bold",
  },
  disclaimer: {
    marginTop: 15,
    fontSize: 12,
    color: "#777",
  },
};

