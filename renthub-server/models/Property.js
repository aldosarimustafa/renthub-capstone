const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },

        zipCode: {
            type: String,
            required: true,
        },

        rentAmount: {
            type: Number,
            required: true,
        },

        bedrooms: {
            type: Number,
            required: true,
        },

        bathrooms: {
            type: Number,
            required: true,
        },

        imageUrl: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["Available", "Occupied", "Maintenance"],
            default: "Available",
        },

        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Property", propertySchema);