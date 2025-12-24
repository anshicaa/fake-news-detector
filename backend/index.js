const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
const axios = require("axios");

app.post("/check-news", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/predict",
      { text: req.body.text }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "AI service not reachable" });
  }
});
