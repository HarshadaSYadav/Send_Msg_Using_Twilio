import React, { useState } from "react";
import axios from "axios";
import './SendMessage.css';

const SendMessage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber || !message) {
      setStatusMessage("Please enter both a phone number and a message.");
      return;
    }

    try {
      // Directly use the deployed backend URL
      const response = await axios.post(
        "/send-sms", // Direct URL without using environment variables
        {
          to: phoneNumber,
          message: message,
        }
      );

      if (response.data.success) {
        setStatusMessage("Message sent successfully!");
        setPhoneNumber("");
        setMessage("");
      }
    } catch (error) {
      setStatusMessage("Failed to send message.");
      console.error("Error sending SMS:", error);
    }
  };

  return (
    <div>
      <h2>Send SMS</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send SMS</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default SendMessage;
