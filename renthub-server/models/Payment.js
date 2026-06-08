const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        leaseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lease",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        paymentDate: {
            type: Date,
            default: Date.now,
        },

        paymentMethod: {
            type: String,
            enum: ["Cash", "Card", "Transfer"],
            default: "Transfer",
        },

        paymentStatus: {
            type: String,
            enum: ["Paid", "Pending", "Late"],
            default: "Paid",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Payment", paymentSchema);