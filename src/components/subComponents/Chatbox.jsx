import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Form, message as antdMessage, Tooltip } from 'antd';

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerData, setRegisterData] = useState({ email: '', phone: '', intent: 'N/A' });
  const [formErrors, setFormErrors] = useState({ email: '', phone: '' });

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [detailedAnswer, setDetailedAnswer] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning!';
    if (hour < 17) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const validateForm = () => {
    const errors = { email: '', phone: '' };
    let isValid = true;

    if (!registerData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(registerData.email)) {
      errors.email = 'Enter valid email';
      isValid = false;
    }

    if (!registerData.phone) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!validatePhone(registerData.phone)) {
      errors.phone = 'Enter 10-digit phone number';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const params = new URLSearchParams();
      params.append('email', registerData.email);
      params.append('phone', registerData.phone);
      params.append('intent', registerData.intent);

      const res = await axios.post(`http://65.0.113.12:8000/user/register`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      if (res.data.success || res.status === 200) {
        localStorage.setItem('emailId', registerData.email);
        setIsRegistered(true);
        antdMessage.success('Registration successful!');
      } else {
        antdMessage.error('Registration failed.');
      }
    } catch (err) {
      console.error(err);
      antdMessage.error('Error registering.');
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const emailId = localStorage.getItem('emailId');
    const userMsg = { sender: '👤You', text: message };
    setChatHistory((prev) => [...prev, userMsg]);
    setMessage('');
    setIsTyping(true);

    try {
      const params = new URLSearchParams();
      params.append('email', emailId);
      params.append('user_query', message);

      const res = await axios.post(`http://65.0.113.12:8000/chat`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const botMsg = {
        sender: '🤖NibavBot',
        text: res.data.short_desc,
      };
      setChatHistory((prev) => [...prev, botMsg]);
      setDetailedAnswer(res.data.long_desc || '');
      setShowDetails(false);
    } catch (err) {
      console.error(err);
      antdMessage.error('Bot failed to respond.');
    }

    setIsTyping(false);
  };

  const handleTellMeMore = () => {
    if (!detailedAnswer) return;
    const detailMsg = { sender: '🤖NibavBot', text: detailedAnswer };
    setChatHistory((prev) => [...prev, detailMsg]);
    setShowDetails(true);
  };

  const handleDownload = () => {
    const content = chatHistory
      .map((msg) => `${msg.sender.replace('🤖', '').replace('👤', '')}: ${msg.text}`)
      .join('\n\n');
  
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'nibavbot_conversation.txt';
    link.click();
  };

  // Show greeting on open + registration
  useEffect(() => {
    if (isOpen && isRegistered && chatHistory.length === 0) {
      const greeting = getGreeting();
      const welcomeMsg = {
        sender: '🤖NibavBot',
        text: `Hi, welcome chief! ${greeting} I am NibavBot, your personal assistant. How can I help you today?`,
      };
      setChatHistory([welcomeMsg]);
    }
  }, [isOpen, isRegistered]);

  return (
    <>
      {/* Floating Button */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}>
        <button
          onClick={toggleChat}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          🤖
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '30px',
            width: '400px',
            height: '480px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
          }}
        >
          {/* Header */}
          <div
  style={{
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}
>
  🤖 NibavBot
  
  <div style={{ display: 'flex', gap: '8px' }}>
  {chatHistory.length > 1 && (
    <Button
      size="small"
      style={{
        backgroundColor: '#fff',
        color: '#007bff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '12px',
      }}
      onClick={handleDownload}
    >
      <Tooltip title="Download Chat History">
      ⬇
      </Tooltip>
    </Button>
  )}
    <button
      onClick={toggleChat}
      style={{
        background: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
      }}
    >
      ❌
    </button>
  </div>
</div>

          {/* Body */}
          <div style={{ flex: 1, padding: '10px', overflowY: 'auto', fontSize: '14px' }}>
            {!isRegistered ? (
              <>
                <p>Please register to start chatting:</p>
                <Form layout="vertical">
                  <Form.Item
                    label="Email"
                    validateStatus={formErrors.email ? 'error' : ''}
                    help={formErrors.email}
                  >
                    <Input
                      type="email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, email: e.target.value })
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    validateStatus={formErrors.phone ? 'error' : ''}
                    help={formErrors.phone}
                  >
                    <Input
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, phone: e.target.value })
                      }
                    />
                  </Form.Item>
                  <Button type="primary" block onClick={handleRegister}>
                    Register
                  </Button>
                </Form>
              </>
            ) : (
              <>
            
            {chatHistory.map((msg, idx) => (
  <div
    key={idx}
    style={{
      display: 'flex',
      justifyContent: msg.sender === '🤖NibavBot' ? 'flex-start' : 'flex-end',
      marginBottom: '8px',
    }}
  >
    <div
      style={{
        backgroundColor: msg.sender === '🤖NibavBot' ? '#007bffa8' : '#f0f0f0',
        color: msg.sender === '🤖NibavBot' ? '#fff' : '#000',
        padding: '10px',
        borderRadius: '12px',
        maxWidth: '80%',
        textAlign: 'left',
      }}
    >
      <strong>{msg.sender}</strong>:<br /> {msg.text}
    </div>
  </div>
))}

                {isTyping && (
                  <div style={{ marginBottom: '8px', fontStyle: 'italic', color: '#888' }}>
                    🤖 NibavBot is typing...
                  </div>
                )}

                {detailedAnswer && !showDetails && (
                  <>
                
                    <span style={{ fontSize: '12px' ,cursor:'pointer',color:'#007bff'}} onClick={handleTellMeMore}>Learn More....</span>
                   
                  </>
                )}

                {/* {chatHistory.length > 1 && (
                  <Button
                    type="default"
                    danger
                    block
                    onClick={() => {
                      setChatHistory([]);
                      setMessage('');
                      setDetailedAnswer('');
                      setShowDetails(false);
                      setIsOpen(false);
                    }}
                    style={{ margin: '8px', width: '50%' }}
                  >
                    End Chat
                  </Button>
                )} */}
              </>
            )}
          </div>

          {/* Footer */}
          {isRegistered && (
            <div style={{ padding: '10px', display: 'flex' }}>
              <Input
                placeholder="Ask a Question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button type="primary" onClick={handleSend} style={{ marginLeft: '5px' }}>
                ➤
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingChatBot;
