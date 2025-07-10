// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Button, Input, Form, message as antdMessage, Tooltip } from 'antd';
// import { useAppContext } from '../../context/AppContext';
// import chatbotlogo from "../../assets/chatlogo.png";
// const FloatingChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [registerData, setRegisterData] = useState({ email: '', phone: '', intent: 'N/A' });
//   const [formErrors, setFormErrors] = useState({ email: '', phone: '' });
//   const [message, setMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [detailedAnswer, setDetailedAnswer] = useState('');
//   const [showDetails, setShowDetails] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [showEndChat, setShowEndChat] = useState(false);
//   const idleTimerRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const { fetchUsers, fetchChats } = useAppContext();

//   const toggleChat = () => setIsOpen(!isOpen);

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good Morning!';
//     if (hour < 17) return 'Good Afternoon!';
//     return 'Good Evening!';
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [chatHistory, isTyping]);

//   useEffect(() => {
//     return () => {
//       if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
//     };
//   }, []);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const resetIdleTimer = () => {
//     if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
//     idleTimerRef.current = setTimeout(() => setShowEndChat(true), 60000);
//   };

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

//   const validateForm = () => {
//     const errors = { email: '', phone: '' };
//     let isValid = true;

//     if (!registerData.email) {
//       errors.email = 'Email is required';
//       isValid = false;
//     } else if (!validateEmail(registerData.email)) {
//       errors.email = 'Enter valid email';
//       isValid = false;
//     }

//     if (!registerData.phone) {
//       errors.phone = 'Phone number is required';
//       isValid = false;
//     } else if (!validatePhone(registerData.phone)) {
//       errors.phone = 'Enter 10-digit phone number';
//       isValid = false;
//     }

//     setFormErrors(errors);
//     return isValid;
//   };

//   const handleRegister = async () => {
//     if (!validateForm()) return;

//     try {
//       const params = new URLSearchParams();
//       params.append('email', registerData.email);
//       params.append('phone', registerData.phone);
//       params.append('intent', registerData.intent);

//       const res = await axios.post(`http://65.0.113.12:8000/user/register`, params, {
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       });

//       if (res.data.success || res.status === 200) {
//         localStorage.setItem('emailId', registerData.email);
//         setIsRegistered(true);
//         antdMessage.success('Registration successful!');
//         fetchUsers();
//       } else {
//         antdMessage.error('Registration failed.');
//       }
//     } catch (err) {
//       console.error(err);
//       antdMessage.error('Error registering.');
//     }
//   };

//   const handleSend = async () => {
//     if (!message.trim()) return;

//     const emailId = localStorage.getItem('emailId');
//     const userMsg = { sender: '👤You', text: message };
//     setChatHistory((prev) => [...prev, userMsg]);
//     setMessage('');
//     setIsTyping(true);
//     resetIdleTimer();
//     setShowEndChat(false);

//     try {
//       const params = new URLSearchParams();
//       params.append('email', emailId);
//       params.append('user_query', message);

//       const res = await axios.post(`http://65.0.113.12:8000/chat`, params, {
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       });

//       const botMsg = { sender: '🤖Nibav', text:res.data.long_desc };
//       setChatHistory((prev) => [...prev, botMsg]);
//       setDetailedAnswer(res.data.long_desc || '');
//       setShowDetails(false);
//       fetchChats();
//     } catch (err) {
//       console.error(err);
//       antdMessage.error('Bot failed to respond.');
//     }

//     setIsTyping(false);
//   };

//   const handleEndChat = () => {
//     setChatHistory([]);
//     setMessage('');
//     setDetailedAnswer('');
//     setShowDetails(false);
//     setShowEndChat(false);
//     setIsOpen(false);
//     setIsRegistered(false);
//   };

//   const handleTellMeMore = () => {
//     if (!detailedAnswer) return;
//     const detailMsg = { sender: '🤖Nibav', text: detailedAnswer };
//     setChatHistory((prev) => [...prev, detailMsg]);
//     setShowDetails(true);
//   };

//   useEffect(() => {
//     if (isOpen && isRegistered && chatHistory.length === 0) {
//       const greeting = getGreeting();
//       const welcomeMsg = {
//         sender: '🤖Nibav',
//         text: `Hi, welcome chief! ${greeting} I am Nibav, your personal assistant. How can I help you today?`,
//       };
//       setChatHistory([welcomeMsg]);
//     }
//   }, [isOpen, isRegistered]);

//   return (
//     <>
//       <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}>
//         <button
//             // className="blinking" 
//           onClick={toggleChat}
//           style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '50%', width: '60px', height: '60px', fontSize: '24px', cursor: 'pointer' , animation: 'blink 1s infinite',
//             '@keyframes blink': {
//               '0%, 100%': { opacity: 1 },
//               '50%': { opacity: 0.5 },
//             }}}
//         >
//           <img src={chatbotlogo} alt='logo' width={50} />
//         </button>
//       </div>

//       {isOpen && (
//         <div style={{ position: 'fixed', bottom: '90px', right: '30px', width: '400px', height: '480px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', zIndex: 999 }}>
//           <div style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             {/* 🤖 */}
//             <img src={chatbotlogo} width={40}/> Nibav.support
//             <button onClick={toggleChat} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>❌</button>
//           </div>

//           <div style={{ flex: 1, padding: '10px', overflowY: 'auto', fontSize: '14px' }}>
//             {!isRegistered ? (
//               <>
//                 <p>Please register to start chatting:</p>
//                 <Form layout="vertical">
//                   <Form.Item label="Email" validateStatus={formErrors.email ? 'error' : ''} help={formErrors.email}>
//                     <Input type="email" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
//                   </Form.Item>
//                   <Form.Item label="Phone Number" validateStatus={formErrors.phone ? 'error' : ''} help={formErrors.phone}>
//                     <Input 
//                       type="tel" 
//                       value={registerData.phone} 
//                       onChange={(e) => {
//                         // Only allow digits
//                         const value = e.target.value.replace(/[^0-9]/g, '');
//                         setRegisterData({ ...registerData, phone: value });
//                       }}
//                       maxLength={10}
//                       placeholder="Enter 10-digit number"
//                     />
//                   </Form.Item>
//                   <Button type="primary" block onClick={handleRegister}>Register</Button>
//                 </Form>
//               </>
//             ) : (
//               <>
//                 {chatHistory.map((msg, idx) => (
//                   <div key={idx} style={{ display: 'flex', justifyContent: msg.sender === '🤖Nibav' ? 'flex-start' : 'flex-end', marginBottom: '8px' }}>
//                     <div style={{ backgroundColor: msg.sender === '🤖Nibav' ? '#007bffa8' : '#f0f0f0', color: msg.sender === '🤖Nibav' ? '#fff' : '#000', padding: '10px', borderRadius: '12px', maxWidth: '80%', textAlign: 'left' }}>
//                       <strong>{msg.sender}</strong>:<br /> {msg.text}
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />

//                 {isTyping && <div style={{ marginBottom: '8px', fontStyle: 'italic', color: '#888' }}>🤖 Nibav is typing...</div>}

//                 {/* {detailedAnswer && !showDetails && (
//                   <span style={{ fontSize: '12px', cursor: 'pointer', color: '#007bff' }} onClick={handleTellMeMore}>Learn More....</span>
//                 )} */}

//                 {showEndChat && (
//                   <Button
//                     type="default"
//                     danger
//                     block
//                     onClick={handleEndChat}
//                     style={{ marginTop: '10px' }}
//                   >
//                     End Chat
//                   </Button>
//                 )}
//               </>
//             )}
//           </div>

//           {isRegistered && (
//             <div style={{ padding: '10px', display: 'flex' }}>
//               <Input
//                 placeholder="Ask a Question..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//               />
//               <Button type="primary" onClick={handleSend} style={{ marginLeft: '5px' }}>
//                 ➤
//               </Button>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default FloatingChatBot;


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Input, Form, message as antdMessage } from 'antd';
import { useAppContext } from '../../context/AppContext';
import chatbotlogo from "../../assets/chatlogo.png";

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerData, setRegisterData] = useState({ email: '', phone: '', intent: 'N/A',country:'India' });
  const [formErrors, setFormErrors] = useState({ email: '', phone: '' });
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [detailedAnswer, setDetailedAnswer] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEndChat, setShowEndChat] = useState(false);
  const idleTimerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { fetchUsers, fetchChats } = useAppContext();

  const toggleChat = () => setIsOpen(!isOpen);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning!';
    if (hour < 17) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setShowEndChat(true), 5000);
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
      params.append('country',registerData.country)

      const res = await axios.post(`http://3.110.224.17:8000/user/register`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      if (res.data.success || res.status === 200) {
        localStorage.setItem('emailId', registerData.email);
        setIsRegistered(true);
        antdMessage.success('Registration successful!');
        fetchUsers();
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
    resetIdleTimer();
    setShowEndChat(false);

    try {
      const params = new URLSearchParams();
      params.append('email', emailId);
      params.append('user_query', message);

      const res = await axios.post(`http://3.110.224.17:8000/chat`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const botMsg = { sender: '🤖Nibav', text: res.data.long_desc };
      setChatHistory((prev) => [...prev, botMsg]);
      setDetailedAnswer(res.data.long_desc || '');
      setShowDetails(false);
      fetchChats();
    } catch (err) {
      console.error(err);
      antdMessage.error('Bot failed to respond.');
    }

    setIsTyping(false);
  };

  const handleEndChat = () => {
    setChatHistory([]);
    setMessage('');
    setDetailedAnswer('');
    setShowDetails(false);
    setShowEndChat(false);
    setIsOpen(false);
    setIsRegistered(false);
  };

  useEffect(() => {
    if (isOpen && isRegistered && chatHistory.length === 0) {
      const greeting = getGreeting();
      const welcomeMsg = {
        sender: '🤖Nibav',
        text: `Hi 👋, welcome! ${greeting} I’m your assistant today. How can I help you?`,
      };
      setChatHistory([welcomeMsg]);
    }
  }, [isOpen, isRegistered]);

  return (
    <>
      <style>
        {`
          .typing-dots span {
            animation: blink 1.4s infinite both;
            font-size: 22px;
            margin-right: 2px;
            color: #888;
          }

          .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
          .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

          @keyframes blink {
            0%, 80%, 100% { opacity: 0; }
            40% { opacity: 1; }
          }
        `}
      </style>

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
          <img src={chatbotlogo} alt='logo' width={50} />
        </button>
      </div>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '30px',
          width: '400px',
          height: '500px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
          boxShadow: '0 0 12px rgba(0,0,0,0.1)'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#fff',
            padding: '10px 16px',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: 'bold'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 16 }}>
              <div style={{
                // backgroundColor: '#007bff',
                color: '#fff',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
              }}>
                <img src={chatbotlogo} width="50"/>
              </div>
              Product Expert
            </div>
            <button
              onClick={toggleChat}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: 18,
                cursor: 'pointer',
              }}
            >
              ✖
            </button>
          </div>

          {/* Body */}
          <div style={{ flex: 1, padding: '10px', overflowY: 'auto', fontSize: '14px' }}>
            {!isRegistered ? (
              <>
                <p>Please register to start chatting:</p>
                <Form layout="vertical">
                  <Form.Item label="Email" validateStatus={formErrors.email ? 'error' : ''} help={formErrors.email}>
                    <Input type="email" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
                  </Form.Item>
                  <Form.Item label="Phone Number" validateStatus={formErrors.phone ? 'error' : ''} help={formErrors.phone}>
                    <Input
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setRegisterData({ ...registerData, phone: value });
                      }}
                      maxLength={10}
                      placeholder="Enter 10-digit number"
                    />
                    
                  </Form.Item>
                  <Form.Item label="Country" validateStatus={formErrors.country ? 'error' : ''} help={formErrors.country}>
                    <Input
                      type="text"
                      value={registerData.country}
                      onChange={(e) => {
                        const value = e.target.value;
                        setRegisterData({ ...registerData, country: value });
                      }}
                      // maxLength={10}
                      placeholder="eg : India"
                    />
                  </Form.Item>
                  <Button type="primary" style={{backgroundColor:"black"}} block onClick={handleRegister}>Register</Button>
                </Form>
              </>
            ) : (
              <>
                {chatHistory.map((msg, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: msg.sender === '🤖Nibav' ? 'flex-start' : 'flex-end',
                    alignItems: 'flex-start',
                    marginBottom: '10px',
                  }}>
                    {msg.sender === '🤖Nibav' && (
                      <div style={{ marginRight: 8 }}>
                        <div style={{
                          backgroundColor: '#007bff',
                          color: '#fff',
                          borderRadius: '50%',
                          width: 32,
                          height: 32,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                        }}>
                           <img src={chatbotlogo} width="50"/>
                        </div>
                      </div>
                    )}
                    <div style={{
                      backgroundColor: msg.sender === '🤖Nibav' ? '#e6f0ff' : '#fff4e6',
                      color: '#000',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      maxWidth: '75%',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                    <div style={{
                      backgroundColor: '#007bff',
                      color: '#fff',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      marginRight: 8,
                    }}>
                       <img src={chatbotlogo} width="50"/>
                    </div>
                    <div className="typing-dots">
                      <span>.</span><span>.</span><span>.</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          {isRegistered && (
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', borderTop: '1px solid #eee' }}>
              <Input
                placeholder="Type here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                style={{
                  flex: 1,
                  borderRadius: '20px',
                  padding: '8px 16px',
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #ccc',
                }}
              />
              <Button
                type="primary"
                onClick={handleSend}
                shape="circle"
                icon={<span style={{ fontSize: 18 }}>➤</span>}
                style={{ marginLeft: '8px', backgroundColor: '#007bff', borderColor: '#007bff' }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingChatBot;

