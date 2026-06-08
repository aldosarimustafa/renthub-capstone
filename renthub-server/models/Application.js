const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true,
        },
        applicantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        monthlyIncome: {
            type: Number,
            required: true,
        },
        employmentStatus: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);