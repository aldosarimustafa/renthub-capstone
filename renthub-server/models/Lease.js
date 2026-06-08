const mongoose = require("mongoose");

const leaseSchema = new mongoose.Schema(
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

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        monthlyRent: {
            type: Number,
            required: true,
        },

        leaseStatus: {
            type: String,
            enum: ["Active", "Expired", "Terminated"],
            default: "Active",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Lease", leaseSchema);