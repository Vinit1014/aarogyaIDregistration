// require('dotenv').config()
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const twilio = require("twilio"); // Assuming you're using Twilio for sending SMS
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect("mongodb+srv://v1n1ts0010:v1n1ts0010@cluster1.dijkl6n.mongodb.net/?retryWrites=true&w=majority&appName=cluster1", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // Define User schema
// const UserSchema = new mongoose.Schema({
//   mobileNumber: String,
//   otp: String
// });

// const User = mongoose.model("User", UserSchema);

// const accountSid = process.env.accountSid;
// const authToken = process.env.authToken;
// const twilioClient = twilio(accountSid, authToken);
// const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

// app.post("/api/send-otp", async (req, res) => {
//   const { mobileNumber } = req.body;
//   console.log(mobileNumber);
//   try {
//     // Generate random 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     // Send OTP via Twilio
//     await twilioClient.messages.create({
//       body: `Your OTP for registration is: ${otp}`,
//       from: TWILIO_PHONE_NUMBER,
//       to: mobileNumber,
//     });
    
//     // Store OTP in database
//     await User.findOneAndUpdate(
//       { mobileNumber: mobileNumber },
//       { $set: { otp: otp } },
//       { upsert: true }
//     );

//     res.status(200).json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     res.status(500).json({ error: "Failed to send OTP" });
//   }
// });

// // app.post("/api/store-otp", async (req, res) => {
// //     const { mobileNumber, otp } = req.body;

// //     try {
// //         // Verify OTP from the database
// //         const user = await User.findOne({ mobileNumber: mobileNumber, otp: otp });
// //         if (!user) {
// //         return res.status(400).json({ error: "Invalid OTP" });
// //         }

// //         // OTP verification successful, you can proceed with user registration
// //         res.status(200).json({ message: "OTP verified successfully" });
// //     } catch (error) {
// //         console.error("Error storing OTP:", error);
// //         res.status(500).json({ error: "Failed to store OTP" });
// //     }
// // });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const twilio = require("twilio"); // Assuming you're using Twilio for sending SMS
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb+srv://v1n1ts0010:v1n1ts0010@cluster1.dijkl6n.mongodb.net/?retryWrites=true&w=majority&appName=cluster1", {
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

app.post("/api/send-otp", async (req, res) => {
  const { aadharNumber, mobileNumber } = req.body;
  console.log(mobileNumber);
  try {
    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Send OTP via Twilio
    await twilioClient.messages.create({
      body: `Your OTP for registration is: ${otp}`,
      from: TWILIO_PHONE_NUMBER,
      to: mobileNumber,
    });
    
    // Store OTP in database
    await User.findOneAndUpdate(
      { mobileNumber: mobileNumber },
      { $set: { otp: otp } },
      { upsert: true }
    );

    res.status(200).json({ message: "OTP sent successfully" });
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

        // Update the user record with the Aadhar number
        user.aadharNumber = aadharNumber;
        await user.save();

        res.status(200).json({ message: "Aadhar number added successfully" });
    } catch (error) {
        console.error("Error adding Aadhar number:", error);
        res.status(500).json({ error: "Failed to add Aadhar number" });
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
