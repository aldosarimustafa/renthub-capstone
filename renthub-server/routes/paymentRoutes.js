const express = require("express");
const Payment = require("../models/Payment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try {
        const payment = await Payment.create({
            tenantId: req.user.id,
            leaseId: req.body.leaseId,
            amount: req.body.amount,
            paymentMethod: req.body.paymentMethod,
            paymentStatus: "Paid",
        });

        res.status(201).json({
            message: "Payment recorded successfully",
            payment,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to record payment",
            error: error.message,
        });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        let query = {};

        if (req.user.role !== "Administrator") {
            query.tenantId = req.user.id;
        }

        const payments = await Payment.find(query)
            .populate("tenantId", "fullName email")
            .populate("leaseId");

        res.json(payments);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch payments",
            error: error.message,
        });
    }
});

module.exports = router;