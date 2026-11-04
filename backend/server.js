
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const productsRoute = require("./routes/product");

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/products", productsRoute);

// Test route
app.get("/", (req, res) => {
    res.send("Welcome to the NUTRICO Backend!");
});

// API health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "NUTRICO backend is running!"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`NUTRICO backend running at http://localhost:${PORT}`);
});
