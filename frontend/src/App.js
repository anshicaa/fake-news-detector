import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);

  const wordCount = text.trim().split(/\s+/).length;

  const isSatire = (content) => {
    const satireWords = ["satire", "parody", "joke", "humor", "meme"];
    return satireWords.some(w => content.toLowerCase().includes(w));
  };

  // 🔍 Topic-based source suggestions
  const getSourcesByTopic = (content) => {
    const t = content.toLowerCase();

    if (t.includes("health") || t.includes("virus") || t.includes("vaccine")) {
      return [
        { name: "World Health Organization", url: "https://www.who.int" },
        { name: "Ministry of Health (India)", url: "https://www.mohfw.gov.in" },
        { name: "Google News", url: "https://news.google.com" },
      ];
    }

    if (t.includes("election") || t.includes("government") || t.includes("policy")) {
      return [
        { name: "Press Information Bureau", url: "https://www.pib.gov.in" },
        { name: "Election Commission of India", url: "https://eci.gov.in" },
        { name: "The Hindu", url: "https://www.thehindu.com" },
      ];
    }

    if (t.includes("study") || t.includes("research") || t.includes("climate")) {
      return [
        { name: "Nature", url: "https://www.nature.com" },
        { name: "Science Magazine", url: "https://www.sciencemag.org" },
        { name: "NASA", url: "https://www.nasa.gov" },
      ];
    }

    return [
      { name: "The Hindu", url: "https://www.thehindu.com" },
      { name: "Google News", url: "https://news.google.com" },
      { name: "Reuters", url: "https://www.reuters.com" },
    ];
  };

  const checkNews = async () => {
    if (wordCount < 80) {
      setError("Please paste a full article (minimum 80 words).");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("http://localhost:5000/check-news", { text });
      setResult(res.data);
    } catch {
      setError("Server error. Make sure backend is running.");
    }

    setLoading(false);
  };

  const barColor = (p) =>
    p === "REAL" ? "#22c55e" : p === "FAKE" ? "#ef4444" : "#facc15";

  const icon = { REAL: "✅", FAKE: "⚠️", UNCERTAIN: "❓" };

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.card,
          background: dark ? "#020617" : "#ffffff",
          color: dark ? "#e5e7eb" : "#111827",
        }}
      >
        {/* Header */}
        <div style={styles.header}>
          <h1>AI Fake News Detector</h1>
          <button onClick={() => setDark(!dark)} style={styles.toggle}>
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <p style={{ opacity: 0.8 }}>
          AI-assisted analysis of news text with confidence-aware verification.
        </p>

        <textarea
          rows="6"
          placeholder="Paste full news article here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            ...styles.textarea,
            background: dark ? "#020617" : "#ffffff",
            color: dark ? "#e5e7eb" : "#111827",
          }}
        />

        <button onClick={checkNews} style={styles.button}>
          {loading ? "Analyzing..." : "Check News"}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {result && (
          <div style={styles.resultBox}>
            <h2>
              {icon[result.prediction]} {result.prediction}
            </h2>

            <p>
              Confidence: <strong>{Math.round(result.confidence * 100)}%</strong>
            </p>

            {/* ✅ Confidence BAR (no ring) */}
            <div style={styles.barBg}>
              <div
                style={{
                  ...styles.barFill,
                  width: `${Math.round(result.confidence * 100)}%`,
                  backgroundColor: barColor(result.prediction),
                }}
              />
            </div>

            {!isSatire(text) && (
              <>
                <p style={{ marginTop: 14 }}>
                  {result.prediction === "UNCERTAIN"
                    ? "The model is uncertain. Cross-checking is strongly recommended:"
                    : "You may verify this assessment using trusted sources:"}
                </p>

                <div style={styles.sources}>
                  {getSourcesByTopic(text).map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.sourceCard}
                    >
                      🔗 {s.name}
                    </a>
                  ))}
                </div>
              </>
            )}

            {isSatire(text) && (
              <p style={{ color: "#f59e0b", fontWeight: "bold" }}>
                ⚠️ This appears to be satire or humor.
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

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    background:
      "radial-gradient(circle at top, #6366f1 0%, #0f172a 45%, #020617 100%)",
  },
  card: {
    width: "100%",
    maxWidth: 720,
    borderRadius: 18,
    padding: 24,
    boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggle: {
    border: "none",
    padding: "6px 14px",
    borderRadius: 20,
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #334155",
    resize: "vertical",
  },
  button: {
    marginTop: 12,
    padding: "10px 20px",
    borderRadius: 10,
    border: "none",
    background: "#6366f1",
    color: "#ffffff",
    cursor: "pointer",
  },
  error: {
    color: "#ef4444",
    marginTop: 8,
  },
  resultBox: {
    marginTop: 24,
  },
  barBg: {
    width: "100%",
    height: 10,
    background: "#334155",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 6,
  },
  barFill: {
    height: "100%",
  },
  sources: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },
  sourceCard: {
    padding: "8px 12px",
    borderRadius: 8,
    background: "#1e293b",
    color: "#e5e7eb",
    textDecoration: "none",
    fontWeight: "bold",
  },
  disclaimer: {
    fontSize: 12,
    opacity: 0.65,
    marginTop: 14,
  },
};

