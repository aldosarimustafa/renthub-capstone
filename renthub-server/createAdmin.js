const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const hashedPassword = await bcrypt.hash("password123", 10);

        const admin = await User.findOneAndUpdate(
            { email: "admin@test.com" },
            {
                fullName: "Admin User",
                email: "admin@test.com",
                password: hashedPassword,
                role: "Administrator",
                phone: "1234567890",
            },
            {
                new: true,
                upsert: true,
            }
        );

        console.log("Admin account ready:");
        console.log(admin.email);
        console.log(admin.role);

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

createAdmin();