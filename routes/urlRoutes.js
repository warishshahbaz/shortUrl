// routes/urlRoutes.js
const express = require("express");
const shortid = require("shortid");
const Url = require("../models/Url");
const authMiddleware = require("../auth/auth");

const router = express.Router();

// Middleware to validate JWT


// Create Short URL
router.post("/shorten", authMiddleware, async (req, res) => {
    const { longUrl, customAlias, topic } = req.body;

    if (!longUrl) return res.status(400).json({ message: "Long URL is required" });

    const shortUrl = customAlias || shortid.generate();

    try {
        const newUrl = await Url.create({
            longUrl,
            shortUrl,
            customAlias,
            topic,
            userId: req.user.userId,
        });
        res.status(201).json({ shortUrl: newUrl.shortUrl, createdAt: newUrl.createdAt });
    } catch (error) {
        res.status(500).json({ message: "Error creating short URL", error });
    }
});

module.exports = router;
