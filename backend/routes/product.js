
const express = require("express");
const router = express.Router();

const products = [
    {
        id: "digestease",
        name: "DIGESTEASE",
        description: "Digestive Wellness Powder",
        price: 149,
        category: "Digestive Wellness"
    },
    {
        id: "fibrefit",
        name: "FIBREFIT",
        description: "Daily Fiber Mix",
        price: 149,
        category: "Daily Fiber"
    },
    {
        id: "ironrich",
        name: "IRONRICH",
        description: "Iron-Rich Nutrition Mix",
        price: 149,
        category: "Nutrition"
    },
    {
        id: "boneboost",
        name: "BONEBOOST",
        description: "Calcium-Rich Nutrition Mix",
        price: 149,
        category: "Nutrition"
    }
];

router.get("/", (req, res) => {
    res.json({
        success: true,
        count: products.length,
        products
    });
});

router.get("/:id", (req, res) => {
    const product = products.find(
        item => item.id === req.params.id
    );

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    res.json({
        success: true,
        product
    });
});

module.exports = router;
