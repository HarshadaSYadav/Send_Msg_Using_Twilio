// api/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();

// Twilio credentials from .env
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to send a message
app.post('/send-message', (req, res) => {
    const { to, message } = req.body;

    if (!to || !message) {
        return res.status(400).send({ success: false, error: 'Phone number and message are required.' });
    }

    client.messages
        .create({
            body: message,
            from: twilioPhoneNumber,
            to,
        })
        .then((message) => res.status(200).send({ success: true, sid: message.sid }))
        .catch((error) => res.status(500).send({ success: false, error: error.message }));
});

// Export the app to make it a serverless function for Vercel
module.exports = app;
