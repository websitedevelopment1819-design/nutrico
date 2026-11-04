const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const productsRoute = require("./routes/product");

app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL
    ].filter(Boolean)
}));

app.use(express.json());

app.use("/api/products", productsRoute);

app.get("/", (req, res) => {
    res.send("Welcome to the NUTRICO Backend!");
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "NUTRICO backend is running!"
    });
});

// Export the app for Vercel
module.exports = app;