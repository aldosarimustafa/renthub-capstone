const express = require("express");
const MaintenanceRequest = require("../models/MaintenanceRequest");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try {
        const request = await MaintenanceRequest.create({
            tenantId: req.user.id,
            propertyId: req.body.propertyId,
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
        });

        res.status(201).json({
            message: "Maintenance request submitted successfully",
            request,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to submit maintenance request",
            error: error.message,
        });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const requests = await MaintenanceRequest.find()
            .populate("tenantId", "fullName email")
            .populate("propertyId", "title address city state");

        res.json(requests);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch maintenance requests",
            error: error.message,
        });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const request = await MaintenanceRequest.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!request) {
            return res.status(404).json({ message: "Maintenance request not found" });
        }

        res.json({
            message: "Maintenance request updated successfully",
            request,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update maintenance request",
            error: error.message,
        });
    }
});

module.exports = router;