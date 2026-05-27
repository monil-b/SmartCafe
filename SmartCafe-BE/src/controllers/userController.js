const User = require("../models/userModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    );
};

const generateOTP = () => {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const otp = generateOTP();

        user.otp = otp;

        user.otpExpire =
          Date.now() + 5 * 60 * 1000;

        await user.save();

        await sendEmail({
          email: user.email,
          subject: "SmartCafe Login OTP",
          message: `Your OTP is ${otp}`,
        });

        res.json({
          message: "OTP sent to email",
          email: user.email,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const verifyOTP = async (
  req,
  res
) => {
  try {
    const { email, otp } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (
      user.otp !== otp ||
      user.otpExpire < Date.now()
    ) {
      return res.status(400).json({
        message:
          "Invalid or expired OTP",
      });
    }

    user.otp = undefined;

    user.otpExpire =
      undefined;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(
        user._id
      ),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
    res.json(req.user);
};

// UPDATE USER PROFILE
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;

    user.email = req.body.email || user.email;

    if (req.body.password) {
      const hashedPassword =
        await bcrypt.hash(
          req.body.password,
          10
        );

      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL USERS (ADMIN)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "-password"
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE USER (ADMIN)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    user.resetPasswordToken = resetToken;

    user.resetPasswordExpire =
      Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetUrl =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `Reset your password using this link:\n\n${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: "SmartCafe Password Reset",
      message,
    });

    res.json({
      message: "Reset email sent",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const sendOTP = async (
  email
) => {
  const otp = generateOTP();

  const user = await User.findOne({
    email,
  });

  if (!user) return null;

  user.otp = otp;

  user.otpExpire =
    Date.now() + 5 * 60 * 1000;

  await user.save();

  await sendEmail({
    email,
    subject: "SmartCafe OTP",
    message: `Your OTP is ${otp}`,
  });

  return otp;
};

const resendOTP = async (
  req,
  res
) => {
  try {
    const { email } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    const otp = generateOTP();

    user.otp = otp;

    user.otpExpire =
      Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendEmail({
      email: user.email,
      subject:
        "SmartCafe OTP",
      message: `Your OTP is ${otp}`,
    });

    res.json({
      message:
        "OTP resent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken:
        req.params.token,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid or expired token",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password,10);

    user.password = hashedPassword;

    user.resetPasswordToken =
      undefined;

    user.resetPasswordExpire =
      undefined;

    await user.save();

    res.json({
      message:
        "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const googleLogin = async (
  req,
  res
) => {
  try {
    const { name, email } =
      req.body;

    let user =
      await User.findOne({
        email,
      });

    // If user does not exist
    if (!user) {
      user = await User.create({
        name,
        email,
        password:
          "google-login-user",
      });
    }

    // Existing user OR new user
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(
        user._id
      ),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    forgotPassword,
    resetPassword,
    googleLogin,
    sendOTP,
    verifyOTP,
    resendOTP,
};