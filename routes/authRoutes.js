// routes/authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { googleToken } = req.body;
    if (!googleToken) {
        return res.status(400).json({ message: "Google token is required" });
    }

    try {
        // Validate Google token (implementation omitted for brevity)
        const user = {}; // Replace with the actual Google user payload after verification

        // Generate JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Authentication failed", error });
    }
});

module.exports = router;
