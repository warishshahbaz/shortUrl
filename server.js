// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const topicRoutes = require("./controllers/analyticsController");
const connectDB = require("./db");
const authGoogle = require("./auth/authRoutes");


connectDB()
// Use routes
app.use("/api/auth", authRoutes);
app.use("/api", urlRoutes);
app.use("/topic", topicRoutes);
app.use("/auth", authGoogle)

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("login");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
