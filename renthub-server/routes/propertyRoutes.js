const express = require("express");
const jwt = require("jsonwebtoken");
const Property = require("../models/Property");
const Lease = require("../models/Lease");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let user = null;
        const authHeader = req.headers.authorization;

        if (authHeader?.startsWith("Bearer ")) {
            try {
                const token = authHeader.split(" ")[1];
                user = jwt.verify(token, process.env.JWT_SECRET);
            } catch {
                user = null;
            }
        }

        if (user?.role === "Administrator") {
            const properties = await Property.find().populate(
                "managerId",
                "fullName email"
            );

            const activeLeases = await Lease.find({
                leaseStatus: "Active",
            }).populate("tenantId", "fullName email");

            const propertiesWithOccupants = properties.map((property) => {
                const lease = activeLeases.find(
                    (lease) =>
                        lease.propertyId.toString() === property._id.toString()
                );

                return {
                    ...property.toObject(),
                    occupiedBy: lease ? lease.tenantId : null,
                };
            });

            return res.json(propertiesWithOccupants);
        }

        const availableProperties = await Property.find({
            status: "Available",
        }).populate("managerId", "fullName email");

        res.json(availableProperties);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch properties",
            error: error.message,
        });
    }
});

router.post(
    "/",
    authMiddleware,
    roleMiddleware("Administrator"),
    async (req, res) => {
        try {
            const property = await Property.create({
                ...req.body,
                managerId: req.user.id,
            });

            res.status(201).json({
                message: "Property created successfully",
                property,
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to create property",
                error: error.message,
            });
        }
    }
);

router.get("/:id", async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate(
            "managerId",
            "fullName email"
        );

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.json(property);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch property",
            error: error.message,
        });
    }
});

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("Administrator"),
    async (req, res) => {
        try {
            const property = await Property.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!property) {
                return res.status(404).json({ message: "Property not found" });
            }

            res.json({
                message: "Property updated successfully",
                property,
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to update property",
                error: error.message,
            });
        }
    }
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("Administrator"),
    async (req, res) => {
        try {
            const property = await Property.findByIdAndDelete(req.params.id);

            if (!property) {
                return res.status(404).json({ message: "Property not found" });
            }

            res.json({ message: "Property deleted successfully" });
        } catch (error) {
            res.status(500).json({
                message: "Failed to delete property",
                error: error.message,
            });
        }
    }
);

module.exports = router;