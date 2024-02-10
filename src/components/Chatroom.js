// Chatroom.js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'


const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBHDGzILfjTAx5AWsJmpbFrscmlS3KXWHc");
const Chatroom = () => {
  const [messages, setMessages] = useState([{"role": "user", "parts": ["You are a professional medical adviser"]},{"role": "model", "parts": ["Sure! Happy to help"]}]);
  const [newMessage, setNewMessage] = useState('');

  
  const sendMessage =  async () => {
    if (newMessage.trim() !== '') {
      if(messages[messages.length-1].role==="model")
      messages.push({ parts: [newMessage], role: 'user' })
      // setMessages((prevMessages) => [...prevMessages, { parts: [newMessage], role: 'user' }]);
      setNewMessage('');
     console.log(messages)
      {
        const response = await fetch('http://127.0.0.1:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers you need
          },
          body: JSON.stringify({"body":messages}),
        });
        const ans = await response.json()
        setNewMessage('')
        //  setMessages((prevMessages) => [...prevMessages, { parts:[ans.response], role: 'model' }]);
        // sendMessages
        
        messages.push({ parts:[ans.response], role: 'model' })
      }
      
    }
        setNewMessage('')

  };

  return (
    <div style={styles.container}>
      <div style={styles.messageContainer}>
        
      {messages.map((message, index) => (
          <div key={index}>
            {message.role === 'user' ? (
              <div style={styles.userMessage}>
                <strong>{message.role}:</strong> {message.parts[0]}
              </div>
            ) : (
              <div style={styles.otherMessage}>
              {/* Render Markdown content as plain text */}
              <ReactMarkdown>{message.parts[0]}</ReactMarkdown>
            </div>
            )}
          </div>
        ))}
       
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    // border: '1px solid #ccc',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh', // Adjusted to take up full viewport height
  },
  messageContainer: {
    maxHeight: '800px',
    overflowY: 'scroll',
  },
  userMessage: {
    textAlign: 'right',
    margin: '10px',
    padding: '8px',
    background: '#4CAF50',
    color: 'white',
    borderRadius: '8px',
  },
  otherMessage: {
    textAlign: 'left',
    margin: '10px',
    padding: '8px',
    background: '#f1f1f1',
    borderRadius: '8px',
  },
  inputContainer: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: '1',
    padding: '8px',
    marginRight: '10px',
  },
  button: {
    padding: '8px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Chatroom;
