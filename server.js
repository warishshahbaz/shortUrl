// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const rateLimit = require("express-rate-limit");
const app = express();
// Define the rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { message: "Too many requests from this IP, please try again later." },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiter to all requests
app.use(limiter);

// Middleware
app.use(express.json());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Import routes
const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const topicRoutes = require("./controllers/analyticsController");
const connectDB = require("./db");
const authGoogle = require("./auth/authRoutes");
const apiDocs = require("./routes/apiDocs")
const routesAuth = require("./routes/auth")


connectDB()
// Use routes
app.use("/api/auth", authRoutes);
app.use("/api", urlRoutes);
app.use("/topic", topicRoutes);
app.use("/auth", authGoogle)
app.use('/api-doc', apiDocs);
app.use("/sign", routesAuth)

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Fallback for all other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Routes
app.get("/", (req, res) => {
    res.render("login");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
