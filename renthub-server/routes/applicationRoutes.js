const express = require("express");
const Application = require("../models/Application");
const Lease = require("../models/Lease");
const Property = require("../models/Property");
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
        let applications;

        if (req.user.role === "Administrator") {
            applications = await Application.find()
                .populate(
                    "propertyId",
                    "title address city state rentAmount"
                )
                .populate(
                    "applicantId",
                    "fullName email"
                );
        } else {
            applications = await Application.find({
                applicantId: req.user.id,
            })
                .populate(
                    "propertyId",
                    "title address city state rentAmount"
                )
                .populate(
                    "applicantId",
                    "fullName email"
                );
        }

        res.json(applications);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch applications",
            error: error.message,
        });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status,
            },
            {
                new: true,
                runValidators: true,
            }
        ).populate("propertyId");

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        if (req.body.status === "Approved") {
            const existingLease = await Lease.findOne({
                tenantId: application.applicantId,
                propertyId: application.propertyId._id,
                leaseStatus: "Active",
            });

            if (!existingLease) {
                const startDate = new Date();
                const endDate = new Date();

                endDate.setFullYear(startDate.getFullYear() + 1);

                await Lease.create({
                    tenantId: application.applicantId,
                    propertyId: application.propertyId._id,
                    startDate,
                    endDate,
                    monthlyRent: application.propertyId.rentAmount,
                    leaseStatus: "Active",
                });
            }

            await Property.findByIdAndUpdate(
                application.propertyId._id,
                {
                    status: "Occupied",
                }
            );
        }

        if (req.body.status === "Rejected") {
            // Future enhancement:
            // Send rejection notification
            // Keep record in Rejected Applications section
        }

        res.json({
            message: "Application status updated successfully",
            application,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update application",
            error: error.message,
        });
    }
});

module.exports = router;