const authMiddleware = require("../auth/auth");
const Url = require("../models/Url");
const express = require("express");

const router = express.Router();

router.get("/shorten/:alias", async (req, res) => {
    const { alias } = req.params;

    try {
        const url = await Url.findOne({ shortUrl: alias });
        if (!url) return res.status(404).json({ message: "Short URL not found" });

        // Log analytics data here

        res.redirect(url.longUrl);
    } catch (error) {
        res.status(500).json({ message: "Error redirecting", error });
    }
});

router.get("/analytics/:alias", authMiddleware, async (req, res) => {
    const { alias } = req.params;

    try {
        // Example analytics response
        const analytics = {
            totalClicks: 100,
            uniqueClicks: 90,
            clicksByDate: [],
            osType: [],
            deviceType: [],
        };

        res.json(analytics);
    } catch (error) {
        res.status(500).json({ message: "Error fetching analytics", error });
    }
});

router.get("/analytics/overall", authMiddleware, async (req, res) => {
    try {
        const overallAnalytics = {
            totalUrls: 10,
            totalClicks: 1000,
            uniqueClicks: 800,
            clicksByDate: [],
            osType: [],
            deviceType: [],
        };

        res.json(overallAnalytics);
    } catch (error) {
        res.status(500).json({ message: "Error fetching overall analytics", error });
    }
});


module.exports = router;
