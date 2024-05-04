require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const twilio = require("twilio"); // Assuming you're using Twilio for sending SMS
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define User schema
const UserSchema = new mongoose.Schema({
  aadharNumber: String,
  mobileNumber: String,
  otp: String
});

const User = mongoose.model("User", UserSchema);

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const twilioClient = twilio(accountSid, authToken);
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(403).json({ message: 'Invalid token' });
  }
};

app.post("/api/send-otp", async (req, res) => {
  const { aadharNumber, mobileNumber } = req.body;
  console.log(mobileNumber);
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const send = await twilioClient.messages.create({
      body: `Your OTP for registration is: ${otp}`,
      from: TWILIO_PHONE_NUMBER,
      to: mobileNumber,
    });
    console.log("OTPPP "+send);
    await User.findOneAndUpdate(
      { mobileNumber: mobileNumber },
      { $set: { otp: otp } },
      { upsert: true }
    );

    if (send) {
      res.send({ message: "OTP sent successfully" });
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.post("/apilogin/send-otp", async (req, res) => {
  const { mobileNumber } = req.body;
  const user = await User.findOne({ mobileNumber});
  if (!user) {
    res.send({ message: "User not registered"});
    return;
  }
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const send = await twilioClient.messages.create({
      body: `Your OTP for registration is: ${otp}`,
      from: TWILIO_PHONE_NUMBER,
      to: mobileNumber,
    });
    console.log("OTPPP "+send);

    if (send) {
      res.send({ message: "OTP sent successfully" });
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});



app.post("/api/store-otp", async (req, res) => {
    const { aadharNumber, otp, mobileNumber } = req.body;
    console.log(aadharNumber);
    try {
        // Find user by mobile number and OTP
        const user = await User.findOne({ mobileNumber, otp });

        if (!user) {
            return res.status(400).json({ error: "Invalid OTP" });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          
        // Update the user record with the Aadhar number
        user.aadharNumber = aadharNumber;
        await user.save();

        res.send({ message: "OTP verified successfully",token });
        // res.status(200).json({ message: "Aadhar number added successfully", token });
        
    } catch (error) {
        console.error("Error adding Aadhar number:", error);
        res.status(500).json({ error: "Failed to add Aadhar number" });
    }
});

app.get('/api/protected', verifyToken, async (req, res) => {
  try {
    // Access userId from req object
    const userId = req.userId;
    // Retrieve user data from database using userId
    const user = await User.findById(userId);
    if (!user) {
      return res.send({message:"User not found"})
    }
    // Send response
    return res.send({message:"User logged in Congrats!"})
    // res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching protected data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
