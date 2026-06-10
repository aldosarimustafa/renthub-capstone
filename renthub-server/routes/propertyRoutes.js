const express = require("express");
const Property = require("../models/Property");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const properties = await Property.find()
            .populate("managerId", "fullName email");

        res.json(properties);
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
    roleMiddleware("Property Manager", "Administrator"),
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
        const property = await Property.findById(req.params.id)
            .populate("managerId", "fullName email");

        if (!property) {
            return res.status(404).json({
                message: "Property not found",
            });
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
    roleMiddleware("Property Manager", "Administrator"),
    async (req, res) => {
        try {
            const property = await Property.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

            if (!property) {
                return res.status(404).json({
                    message: "Property not found",
                });
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
    roleMiddleware("Property Manager", "Administrator"),
    async (req, res) => {
        try {
            const property = await Property.findByIdAndDelete(
                req.params.id
            );

            if (!property) {
                return res.status(404).json({
                    message: "Property not found",
                });
            }

            res.json({
                message: "Property deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to delete property",
                error: error.message,
            });
        }
    }
);

module.exports = router;