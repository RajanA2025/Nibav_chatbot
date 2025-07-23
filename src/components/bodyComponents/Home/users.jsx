import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
  Table,
  Button,
  message,
  Modal,
  DatePicker,
  Spin,
  Input,
  Select,
  Checkbox,
  Space,
  Tag,
} from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [bulkStatus, setBulkStatus] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { fetchchatUsers, Chatusers } = useAppContext();
  const [localUsers, setLocalUsers] = useState([]);
  const Role = localStorage.getItem("Role");

  const API_URL = 'http://3.110.224.17:8000';

  useEffect(() => {
    fetchchatUsers();
  }, []);

  useEffect(() => {
    setLocalUsers(Chatusers);
  }, [Chatusers]);

  const openHistoryModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setChatHistory([]);
    fetchChatHistory(user.email);
  };

  const fetchChatHistory = async (email) => {
    setHistoryLoading(true);
    try {
      const res = await axios.get(`${API_URL}/users/history`, {
        params: { email },
      });
      setChatHistory(res.data.history || []);
    } catch (error) {
      message.error('Failed to fetch chat history');
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleInlineEdit = (email, key, value) => {
    const updated = localUsers.map((user) =>
      user.email === email ? { ...user, [key]: value } : user
    );
    setLocalUsers(updated);
  };

  const handleUpdate = async (record) => {
    try {
      const payload = new URLSearchParams({
        email: record.email,
        status: record.status || 'Pending',
        description: record.description || '',
      });
      await axios.put(`${API_URL}/Chatuser/update`, payload, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      message.success(`User Data Updated Successfully`);
      fetchchatUsers();
    } catch (error) {
      message.error('Failed to update user');
    }
  };

  const handleBulkUpdate = async () => {
    try {
      await Promise.all(
        selectedRowKeys.map((email) => {
          const user = localUsers.find((u) => u.email === email);
          const payload = new URLSearchParams({
            email: user.email,
            status: bulkStatus,
            description: user.description || '',
          });
          return axios.put(`${API_URL}/Chatuser/update`, payload, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          });
        })
      );
      message.success('Selected users updated successfully');
      setSelectedRowKeys([]);
      fetchchatUsers();
    } catch (error) {
      message.error('Bulk update failed');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'red';
      case 'Inprogress':
        return 'blue';
      case 'Completed':
        return 'green';
      default:
        return 'default';
    }
  };

  const filteredUsers = localUsers.filter((user) => {
    const matchesSearch =
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.phone?.toLowerCase().includes(search.toLowerCase());
  
    const matchesDate =
      dateRange.length === 0 ||
      (user.chat_date &&
        moment(user.chat_date, "DD/MM/YYYY").isSameOrAfter(moment(dateRange[0]).startOf('day')) &&
        moment(user.chat_date, "DD/MM/YYYY").isSameOrBefore(moment(dateRange[1]).endOf('day')));
  
    const matchesStatus = !statusFilter || user.status === statusFilter;
  
    return matchesSearch && matchesDate && matchesStatus;
  });

  const baseColumns = [
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Date',
      dataIndex: 'chat_date',
      key: 'chat_date',
      render: (date) => (date ? moment(date).format('YYYY-MM-DD') : 'N/A'),
    },
    {
      title: 'Summary',
      dataIndex: 'summary',
      key: 'summary'
     
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select
          value={record.status}
          // Admin: always enabled. Sales: disabled if completed.
          disabled={Role === "sales" && record.status === "completed"}
          onChange={value => handleInlineEdit(record.email, 'status', value)}
          style={{ width: 120 }}
        >
          <Option value="pending">Pending</Option>
          <Option value="in_progress">In Progress</Option>
          <Option value="completed">Completed</Option>
        </Select>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => (
        <Input
          value={record.description || ''}
          placeholder="Add description..."
          onChange={(e) => handleInlineEdit(record.email, 'description', e.target.value)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => openHistoryModal(record)}>
            History
          </Button>
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const adminColumns = [
    ...baseColumns,
    {
      title: 'UpdatedBy',
      dataIndex: 'updated_by',
      key: 'updated_by'
    }
  ];

  const columns = Role === "admin" ? adminColumns : baseColumns;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Chat Users</h2>

      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder="Search email or phone"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />
        <RangePicker onChange={(dates) => setDateRange(dates || [])} />
        <Select
          placeholder="Filter by status"
          allowClear
          value={statusFilter || undefined}
          onChange={(val) => setStatusFilter(val)}
          style={{ width: 200 }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Inprogress">InProgress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
        <Select
          value={bulkStatus}
          placeholder="Set status for selected"
          onChange={(val) => setBulkStatus(val)}
          style={{ width: 200 }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Inprogress">InProgress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
        <Button type="primary" disabled={!bulkStatus || selectedRowKeys.length === 0} onClick={handleBulkUpdate}>
          Update Selected
        </Button>
      </Space>

      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
          getCheckboxProps: (record) => ({ disabled: !record.email }),
        }}
        columns={columns}
        dataSource={filteredUsers.map((u, i) => ({ key: u.email, ...u }))}
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={`Chat History - ${selectedUser?.email}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {historyLoading ? (
          <Spin />
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {chatHistory.length > 0 ? (
              <ul style={{ paddingLeft: '20px' }}>
                {chatHistory.map((msg, i) => (
                  <li key={i} style={{ marginBottom: '10px' }}>
                    <strong>👤 User:</strong> {msg.user_query}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No chat history available.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Users;
