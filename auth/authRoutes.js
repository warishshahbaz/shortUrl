const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const Users = require("../models/User"); // Assuming you have a Mongoose model defined for your User schema
const router = express.Router();
//14906643356-8q15jkrp70las9nn0d8dodg8dosd3sb9.apps.googleusercontent.com
// Initialize Google OAuth2 client
const client = new OAuth2Client("14906643356-8q15jkrp70las9nn0d8dodg8dosd3sb9.apps.googleusercontent.com");

router.post("/google/callback", async (req, res) => {
    const { credential } = req.body;

    try {
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: "14906643356-8q15jkrp70las9nn0d8dodg8dosd3sb9.apps.googleusercontent.com",
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        // Check if the user already exists in the database
        let user = await Users.findOne({ email });

        if (user) {
            // Update the existing user with the latest data from Google
            user.name = name;
            user.picture = picture;
            await user.save();
        } else {
            // Create a new user record
            user = await Users.create({ email, name, picture });
        }

        // Respond with user information
        res.status(200).json({
            message: "User authenticated successfully",
            user: {
                email: user.email,
                name: user.name,
                picture: user.picture,
            },
        });
    } catch (error) {
        console.error("Error verifying Google token", error);
        res.status(401).json({ message: "Authentication failed", error: error.message });
    }
});

module.exports = router;
