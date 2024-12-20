// models/Url.js
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    customAlias: { type: String, unique: true },
    topic: { type: String },
    createdAt: { type: Date, default: Date.now },
    userId: { type: String, required: true },
});

module.exports = mongoose.model("Url", urlSchema);
