const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    customAlias: { type: String },
    topic: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    createdAt: { type: Date, default: Date.now },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
