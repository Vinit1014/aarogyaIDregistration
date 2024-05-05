require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://aarogya-i-dregistration-frontend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define User schema
const UserSchema = new mongoose.Schema({
  aadharNumber: String,
  email: String,
  otp: String,
});

const User = mongoose.model("User", UserSchema);

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};

const auth = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

app.get("/", (req, res) => {
  res.send("Hello world Live");
});

app.post("/api/send-otp", async (req, res) => {
  const { aadharNumber, email } = req.body;
  console.log(email);
  //   console.log(email);
  try {
    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await User.findOneAndUpdate(
      { email: email },
      { $set: { otp: otp } },
      { upsert: true }
    );

    const receiver = {
      from: process.env.APP_EMAIL,
      to: email,
      subject: "AarogyaID verification OTP!",
      text: `Hello this is a text mail! OTP IS ${otp}`,
    };

    auth.sendMail(receiver, (error, emailResponse) => {
      if (error) throw error;
      console.log("success!");
      response.end();
    });
    res.send({ message: "OTP sent successfully" });
    
    // res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.send({ message: "Error sending OTP" });
    // res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.post("/apilogin/send-otp", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.send({ message: "User not registered" });
    return;
  }
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await User.findOneAndUpdate(
      { email: email },
      { $set: { otp: otp } },
      { upsert: true }
    );

    //send otp
    const receiver = {
      from: process.env.APP_EMAIL,
      to: email,
      subject: "AarogyaID verification OTP!",
      text: `Hello this is a text mail! OTP IS ${otp}`,
    };

    auth.sendMail(receiver, (error, emailResponse) => {
      if (error) throw error;
      // console.log("success!");
      res.send({ message: "OTP sent successfully" });
      response.end();
    });

    // console.log("OTPPP "+send);
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.post("/api/store-otp", async (req, res) => {
  const { aadharNumber, otp, email } = req.body;
  console.log(aadharNumber);
  try {
    // Find user by mobile number and OTP
    const user = await User.findOne({ email, otp });

    if (!user) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Update the user record with the Aadhar number
    user.aadharNumber = aadharNumber;
    await user.save();
    
    res.send({ message: "OTP verified successfully", token });
  } catch (error) {
    console.error("Error adding Aadhar number:", error);
    res.status(500).json({ error: "Failed to add Aadhar number" });
  }
});

app.get("/api/protected", verifyToken, async (req, res) => {
  try {
    // Access userId from req object
    const userId = req.userId;
    const otp = req.otp;
    // Retrieve user data from database using userId
    const user = await User.findOne({userId,otp});
    if (!user) {
      return res.send({ message: "User not found" });
    }
    // Send response
    return res.send({ message: "User logged in Congrats!" },token);
    // res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching protected data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
