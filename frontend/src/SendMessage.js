import React, { useState } from "react";
import axios from "axios";
import './SendMessage.css'; // Import CSS for styling

const SendMessage = () => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(""); // Reset response message

    if (!to || !message) {
      setResponse("Please enter both phone number and message.");
      return;
    }

    try {
      // Directly use the deployed backend URL
      const res = await axios.post(
        "https://your-backend-url.vercel.app/send-sms", // Replace with the actual backend URL deployed on Vercel
        { to, message }
      );

      if (res.data.success) {
        setResponse("Message sent successfully!");
      } else {
        setResponse("Failed to send the message.");
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div className="send-message-container">
      <h2>Send SMS</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phoneNumber">Recipient Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"  // id attribute added
            name="phoneNumber" // name attribute added
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="+1234567890"
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message" // id attribute added
            name="message" // name attribute added
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message here..."
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default SendMessage;
