const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
    alias: { type: String, unique: true },
    longUrl: { type: String, required: true },
    userId: { type: String, required: true },
    topic: String,
    createdAt: { type: Date, default: Date.now },
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = ShortUrl

