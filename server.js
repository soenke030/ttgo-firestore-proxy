import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const FIRESTORE_URL = "https://firestore.googleapis.com/v1/projects/bestellservice-85071/databases/(default)/documents/trackerData";
const API_KEY = process.env.FIRESTORE_API_KEY; // sicher in Render hinterlegen!

app.post("/track", async (req, res) => {
  try {
    const data = req.body;

    const response = await axios.post(`${FIRESTORE_URL}?key=${API_KEY}`, data, {
      headers: { "Content-Type": "application/json" },
    });

    res.status(200).send(response.data);
  } catch (err) {
    console.error("Fehler beim Weiterleiten:", err.response?.data || err.message);
    res.status(500).send({ error: "Fehler beim Senden an Firestore" });
  }
});

app.get("/", (_, res) => {
  res.send("📡 TTGO Firestore Proxy läuft!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}`));
