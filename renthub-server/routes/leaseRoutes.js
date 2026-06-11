const express = require("express");
const Lease = require("../models/Lease");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware("Administrator"),
    async (req, res) => {
        try {
            const lease = await Lease.create(req.body);

            res.status(201).json({
                message: "Lease created successfully",
                lease,
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to create lease",
                error: error.message,
            });
        }
    }
);

router.get("/", authMiddleware, async (req, res) => {
    try {
        let query = {};

        if (req.user.role !== "Administrator") {
            query.tenantId = req.user.id;
        }

        const leases = await Lease.find(query)
            .populate("tenantId", "fullName email")
            .populate("propertyId", "title address");

        res.json(leases);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch leases",
            error: error.message,
        });
    }
});

module.exports = router;