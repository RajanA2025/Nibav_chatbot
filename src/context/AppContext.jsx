// src/context/AppContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const AppContext = createContext();
export const API_URL = "http://3.110.224.17:8000";

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [Chatusers, setchatUsers] = useState([]);
  const [DailyChats, setDailyChats] = useState([]);
  const [monthChats, setmonthChats] = useState([]);
  const [ChatsList, setChats] = useState([]);
  const [weekChats, setweeklyChats] = useState([]);
  const [files, setFiles] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [historyLoading, setHistoryLoading] = useState(false);
const [questions, setQuestions] = useState([])
  
  const fetchchatUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/chatusers/list`);
      setchatUsers(res.data.users || []);
    
    } catch (error) {
    //   message.error("Failed to fetch users Data");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/users/list`);
      setUsers(res.data.users || []);
      // setLastUpdated(Date.now());
    } catch (error) {
    //   message.error("Failed to fetch users Data");
    } finally {
      setLoading(false);
    }
  };

  const fetchChats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/analytics/chat_counts`);
      setChats(res.data.daily)
      setDailyChats(res.data.daily[0].total_chats || 0);
      setweeklyChats(res.data.weekly.total_chats || 0);
      setmonthChats(res.data.monthly.total_chats || 0);
      // setLastUpdated(Date.now());
    } catch (error) {
    //   message.error("Failed to fetch users Data");
    } finally {
      setLoading(false);
    }
  };


  const fetchQueestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/top-questions`);
      setQuestions(res.data.top_questions)
    
    } catch (error) {
    //   message.error("Failed to fetch users Data");
    } finally {
      setLoading(false);
    }
  };
  

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/files`);
      setFiles(res.data.files || []);
      // setLastUpdated(Date.now());
    } catch (error) {
    //   message.error("Failed to fetch files Data");
    } finally {
      setLoading(false);
    }
  };

  const fetchChatHistory = async (email) => {
    setHistoryLoading(true);
    try {
      const res = await axios.get(`${API_URL}/users/history`, {
        params: { email },
      });
      setChatHistory(res.data.history || []);
      // setLastUpdated(Date.now());
    } catch (error) {
      message.error("Failed to fetch chat history Data");
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        users,
        files,
        chatHistory,
        Chatusers,
        loading,
        historyLoading,
        DailyChats,
        questions,
        weekChats,
        ChatsList,
        fetchUsers,
        fetchChats,
        fetchFiles,
        lastUpdated,
        fetchchatUsers,
        fetchChatHistory,
        fetchQueestions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
