const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


router.post('/google-signin', async (req, res) => {
    const { googleId, email, name } = req.body;

    try {
        let user = await User.findOne({ googleId });
        if (!user) {
            user = new User({ googleId, email, name });
            await user.save();
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = { router };
