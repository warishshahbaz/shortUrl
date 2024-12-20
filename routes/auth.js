const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { ObjectId } = require("mongodb");
require('dotenv').config();
const rateLimit = require("express-rate-limit");


/**
 * @swagger
 * /sign/google-signin:
 *   post:
 *     summary: Google signin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               googleId:
 *                 type: string
 *                 example: dsfdsgggf745345hhfd
 *               email:
 *                 type: string
 *                 example: xyz@gmail.com
 *               name:
 *                 type: string
 *                 example: xyz
 *     responses:
 *       201:
 *         description: User signin successfully
 *       400:
 *         description: Bad Request
 */

router.post('/google-signin', async (req, res) => {
    const { googleId, email, name } = req.body;

    try {
        let user = await User.findOne({ googleId });

        if (!user) {
            user = new User({ googleId, email, name });
            await user.save();
        }

        // Use the user's _id directly
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
        localStorage.setItem("tokne",token)

        res.status(200).json({ token });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
