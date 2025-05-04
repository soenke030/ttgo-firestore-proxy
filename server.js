const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const FIRESTORE_URL = "https://firestore.googleapis.com/v1/projects/bestellservice-85071/databases/(default)/documents/trackerData";
const API_KEY = process.env.FIRESTORE_API_KEY;

app.get("/", (_, res) => {
  res.send("📡 TTGO Firestore Proxy läuft!");
});

app.post("/track", async (req, res) => {
  try {
    const data = req.body;
    console.log("📥 Empfangen:", JSON.stringify(data, null, 2));

    const response = await axios.post(`${FIRESTORE_URL}?key=${API_KEY}`, data, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("✅ Gesendet an Firestore");
    res.status(200).send(response.data);
  } catch (err) {
    console.error("❌ Fehler:", err.response?.data || err.message);
    res.status(500).send({ error: "Fehler beim Senden an Firestore" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}`));
