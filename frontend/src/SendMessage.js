import React, { useState } from 'react';
import axios from 'axios';
import './SendMessage.css';

const SendMessage = () => {
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponse('');

        try {
            const res = await axios.post('http://localhost:5000/send-message', {
                to,
                message,
            });
            if (res.data.success) {
                setResponse('Message sent successfully!');
            } else {
                setResponse('Failed to send the message.');
            }
        } catch (error) {
            setResponse(`Error: ${error.message}`);
        }
    };

    return (
        <div className="container">
            <h1>Send SMS</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Recipient Phone Number:</label>
                    <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="+1234567890"
                        required
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
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
