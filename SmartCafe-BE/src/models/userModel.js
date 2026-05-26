const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },
        
        resetPasswordToken: String,
        resetPasswordExpire: Date,

        otp: String,
        otpExpire: Date,

        role: {
            type: String,
            default: "customer",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);    