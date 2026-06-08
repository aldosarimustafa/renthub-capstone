const express = require("express");
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try {
        const application = await Application.create({
            propertyId: req.body.propertyId,
            applicantId: req.user.id,
            monthlyIncome: req.body.monthlyIncome,
            employmentStatus: req.body.employmentStatus,
            notes: req.body.notes,
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to submit application",
            error: error.message,
        });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const applications = await Application.find()
            .populate("propertyId", "title address city state rentAmount")
            .populate("applicantId", "fullName email");

        res.json(applications);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch applications",
            error: error.message,
        });
    }
});

module.exports = router;