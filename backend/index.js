// Import required packages
const express = require("express");
const twilio = require("twilio");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Use environment variables from Vercel directly
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "https://your-frontend-url.vercel.app", // Replace with your actual frontend URL
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Send SMS route
app.post("/send-sms", async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: "Missing 'to' or 'message' field" });
  }

  try {
    const response = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to,
    });

    res.status(200).json({ success: true, messageId: response.sid });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ error: "Failed to send message", details: error });
  }
});

// Start the server (for local development)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
