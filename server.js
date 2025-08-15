const express = require("express");
const QRCode = require("qrcode");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/generate", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Text is required" });

        const qrImage = await QRCode.toDataURL(text);
        res.json({ qrImage });
    } catch (err) {
        res.status(500).json({ error: "Failed to generate QR code" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
