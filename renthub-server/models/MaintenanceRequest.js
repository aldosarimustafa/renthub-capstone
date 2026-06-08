const mongoose = require("mongoose");

const maintenanceRequestSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },

        status: {
            type: String,
            enum: ["Open", "In Progress", "Completed"],
            default: "Open",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "MaintenanceRequest",
    maintenanceRequestSchema
);