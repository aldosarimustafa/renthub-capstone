const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Property = require("../models/Property");
const Application = require("../models/Application");
const MaintenanceRequest = require("../models/MaintenanceRequest");
const Lease = require("../models/Lease");
const Payment = require("../models/Payment");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
    try {
        const report = {
            totalUsers: await User.countDocuments(),
            totalProperties: await Property.countDocuments(),
            totalApplications: await Application.countDocuments(),
            totalMaintenanceRequests: await MaintenanceRequest.countDocuments(),
            totalLeases: await Lease.countDocuments(),
            totalPayments: await Payment.countDocuments(),
        };

        res.json(report);
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate report",
            error: error.message,
        });
    }
});

module.exports = router;