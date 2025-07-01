// import React, { useEffect, useState } from 'react';
// import { Table, Button, message, Modal, DatePicker, Spin, Input } from 'antd';
// import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import moment from 'moment';

// const { RangePicker } = DatePicker;

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedUserEmail, setSelectedUserEmail] = useState(null);
//   const [dateRange, setDateRange] = useState([]);
//   const [historyData, setHistoryData] = useState([]);
//   const [historyLoading, setHistoryLoading] = useState(false);
//   const [search, setSearch] = useState('');

//   const API_URL = "http://65.0.113.12:8000";

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/users/list`);
//       setUsers(res.data.users || []);
//     } catch (error) {
//       message.error('Failed to fetch users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openHistoryModal = (email) => {
//     setSelectedUserEmail(email);
//     setIsModalOpen(true);
//     setHistoryData([]);
//     setDateRange([]);
//     fetchChatHistory()
//   };

//   const fetchChatHistory = async () => {
//     if (!selectedUserEmail) return message.warning("User email not available.");

//     setHistoryLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/users/history`, {
//         params: { email: selectedUserEmail },
//       });
//       setHistoryData(res.data.history || []);
//     } catch (error) {
//       message.error("Failed to fetch chat history");
//     } finally {
//       setHistoryLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Filtered data based on search input
//   const filteredUsers = users.filter((u) =>
//     u.email.toLowerCase().includes(search.toLowerCase()) ||
//     u.phone.toLowerCase().includes(search.toLowerCase())
//   );

//   const columns = [
//     { title: 'Email', dataIndex: 'email', key: 'email' },
//     { title: 'Phone Number', dataIndex: 'phone', key: 'phone' },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Button icon={<EyeOutlined />} onClick={() => openHistoryModal(record.email)}>
//           Chat History
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '2rem' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
//         <h2>User List</h2>
//         <Input
//           placeholder="Search by email or phone"
//           prefix={<SearchOutlined />}
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ width: 300 }}
//         />
//       </div>

//       <Table
//         columns={columns}
//         dataSource={filteredUsers.map((u, i) => ({ key: i, ...u }))}
//         loading={loading}
//         bordered
//       />

//       <Modal
//         title={`Chat History for ${selectedUserEmail}`}
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         // onOk={fetchChatHistory}
//         // okText="Fetch History"
//       >
//         {/* <p>Select date range:</p>
//         <RangePicker
//           style={{ marginBottom: "1rem", width: "100%" }}
//           onChange={(dates) => setDateRange(dates)}
//         /> */}
//         {historyLoading ? (
//           <Spin />
//         ) : (
//           <ul>
//             {historyData.length > 0 ? (
//               historyData.map((msg, i) => (
//                 <li key={i}>
//                   <strong>👤User:</strong> {msg.user_query}
//                 </li>
//               ))
//             ) : (
//               <p>No chat history available.</p>
//             )}
//           </ul>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Users;


import React, { useEffect, useState } from 'react';
import { Table, Button, message, Modal, DatePicker, Spin, Input } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { RangePicker } = DatePicker;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState([]);

  const API_URL = "http://65.0.113.12:8000";

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/users/list`);
      setUsers(res.data.users || []);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openHistoryModal = (email) => {
    setSelectedUserEmail(email);
    setIsModalOpen(true);
    setChatHistory([]);
    fetchChatHistory()
  };

  const fetchChatHistory = async () => {
    if (!selectedUserEmail) return;
    setHistoryLoading(true);
    try {
      const res = await axios.get(`${API_URL}/users/history`, {
        params: { email: selectedUserEmail },
      });
      setChatHistory(res.data.history || []);
    } catch (error) {
      message.error("Failed to fetch chat history");
    } finally {
      setHistoryLoading(false);
    }
  };

  //  Filter logic: search + date range
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.toLowerCase().includes(search.toLowerCase());

    const matchesDate =
      dateRange.length === 0 ||
      (
        user.createdDate &&
        moment(user.createdDate).isBetween(dateRange[0], dateRange[1], 'day', '[]')
      );

    return matchesSearch && matchesDate;
  });

  const columns = [
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Created Date',
      dataIndex: 'last_interaction_time',
      key: 'last_interaction_time',
      // render: (date) => moment(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button icon={<EyeOutlined />} onClick={() => openHistoryModal(record.email)}>
          Chat History
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '2rem' }}>
         <h2>Chat Users</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, gap: '1rem', flexWrap: 'wrap' }}>
        <Input
          placeholder="Search email or phone"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <RangePicker
          onChange={(dates) => setDateRange(dates || [])}
          style={{ width: 300 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredUsers.map((u, i) => ({ key: i, ...u }))}
        loading={loading}
        bordered
      />

      <Modal
        title={`Chat History for ${selectedUserEmail}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        // onOk={fetchChatHistory}
        // okText="Fetch History"
      >
        {historyLoading ? (
          <Spin />
        ) : (
          <ul>
            {chatHistory.length > 0 ? (
              chatHistory.map((msg, i) => (
                <li key={i}>
                  <strong>👤User:</strong> {msg.user_query}
                </li>
              ))
            ) : (
              <p>No chat history available.</p>
            )}
          </ul>
        )}
      </Modal>
    </div>
  );
};

export default Users;
