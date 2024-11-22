const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { ObjectId } = require("mongodb");
const { getUserCollection } = require("../models/user_model");
const { sendVerificationEmail, sendOTPEmail } = require("../utils/email");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateOTP = () => {
  return crypto.randomBytes(3).toString("hex"); // Generate a 6-digit OTP
};

const registerUser = async (email, password) => {
  const users = await getUserCollection();
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = generateOTP();
  const otpTimestamp = new Date();
  const newUser = {
    email,
    password: hashedPassword,
    isVerified: false,
    verificationCode,
    otpTimestamp,
  };
  await users.insertOne(newUser);
  await sendVerificationEmail(email, verificationCode);
};

const registerUserByAdmin = async (email, password, role) => {
  const users = await getUserCollection();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPassword, role, isVerified: true };
  await users.insertOne(newUser);
};

const assignRole = async (email, role) => {
  const users = await getUserCollection();
  const user = await users.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  await users.updateOne({ email }, { $set: { role } });
};

const sendOTP = async (email) => {
  const users = await getUserCollection();
  const user = await users.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const verificationCode = generateOTP();
  const otpTimestamp = new Date();
  await users.updateOne(
    { email },
    { $set: { verificationCode, otpTimestamp } }
  );
  await sendVerificationEmail(email, verificationCode);
};

const verifyUser = async (email, code) => {
  const users = await getUserCollection();
  const user = await users.findOne({ email, verificationCode: code });
  if (!user) {
    throw new Error("Invalid verification code");
  }
  const currentTime = new Date();
  const otpTimestamp = new Date(user.otpTimestamp);
  const timeDifference = (currentTime - otpTimestamp) / (1000 * 60); // difference in minutes
  if (timeDifference > 5) {
    throw new Error("Verification code has expired");
  }
  await users.updateOne(
    { email },
    {
      $set: { isVerified: true },
      $unset: { verificationCode: "", otpTimestamp: "" },
    }
  );
};

const loginUser = async (email, password) => {
  const users = await getUserCollection();
  const user = await users.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  if (!user.isVerified) {
    throw new Error("Email not verified");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const claims = {
    role: user.role,
    permissions: user.permissions || [], // assuming user.permissions is an array of permissions
  };

  const token = jwt.sign({ userId: user._id, ...claims }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const responseData = {
    email: user.email,
    role: user.role,
    token: token,
  };

  return responseData;
};

const getUserProfile = async (userId) => {
  try {
    const users = await getUserCollection();
    const user = await users.findOne(
      { _id: ObjectId.createFromHexString(userId) }, // Correct usage without new
      { projection: { password: 0 } } // Exclude password from the result
    );
    return user;
  } catch (err) {
    console.error("Error in finding user profile:", err); // Added error log
    throw err;
  }
};

const forgotPassword = async (email) => {
  const users = await getUserCollection();
  const user = await users.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.role !== "Patient" && user.role !== "Clinician") {
    throw new Error("Password reset is only allowed for Patients or Doctors.");
  }

  const resetToken = generateOTP();
  const otpTimestamp = new Date();
  await users.updateOne({ email }, { $set: { resetToken, otpTimestamp } });
  await sendOTPEmail(email, resetToken);
};

const resetPassword = async (email, otp, newPassword) => {
  const users = await getUserCollection();
  const user = await users.findOne({ email, resetToken: otp });
  if (!user) {
    throw new Error("Invalid OTP");
  }
  if (user.role !== "Patient" && user.role !== "Clinician") {
    throw new Error("Password reset is only allowed for Patients or Doctors.");
  }

  const currentTime = new Date();
  const otpTimestamp = new Date(user.otpTimestamp);
  const timeDifference = (currentTime - otpTimestamp) / (1000 * 60); // difference in minutes
  if (timeDifference > 5) {
    throw new Error("OTP has expired");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await users.updateOne(
    { email },
    {
      $set: { password: hashedPassword },
      $unset: { resetToken: "", otpTimestamp: "" },
    }
  );
};

const updateUserProfile = async (id, userData) => {
  const users = await getUserCollection();
  const result = await users.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        age: userData.age,
        assessmentStatus: userData.assessmentStatus,
        challenges: userData.challenges,
        clintiansNotes: userData.clinitiansNotes,
        dob: userData.dob,
        email: userData.email,
        gender: userData.gender,
        name: userData.name,
        patientNotes: userData.patientNotes,
        phaseStatus: userData.phaseStatus,
        role: userData.role,
        trafficLightingDescription: userData.trafficLightingDescription,
      },
    }
  );
  return result;
};

const getAllUsers = async () => {
  try {
    const users = await getUserCollection();
    const user = await users.find().toArray();
    return user;
  } catch (err) {
    console.error("Error in getting all users", err); // Added error log
    throw err;
  }
};
const updateUserResult = async (id, resultId) => {
  const users = await getUserCollection();
  const result = await users.updateOne(
    { _id: new ObjectId(id) },
    {
      $push: {
        resultIds:resultId
      },
    },
    { upsert: true }
  );
  return result;
};

module.exports = {
  registerUser,
  registerUserByAdmin,
  assignRole,
  sendOTP,
  verifyUser,
  loginUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
  updateUserProfile,
  getAllUsers,
  updateUserResult
};
