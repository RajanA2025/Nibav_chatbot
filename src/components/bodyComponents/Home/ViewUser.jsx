import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  message,
  Modal,
  Input,
  Form,
  Space,
  Popconfirm,
} from 'antd';
import {
  EyeOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState('');
  const [form] = Form.useForm();

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

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditUser = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (email) => {
    try {
      await axios.delete(`${API_URL}/users/delete?email=${email}`);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      message.error('Delete failed');
    }
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      const params = new URLSearchParams();
      params.append('UserName', values.UserName);
      params.append('phone', values.phone);
      params.append('email', values.email);
      params.append('password', values.password);

      if (editingUser) {
        await axios.put(`${API_URL}/users/update`, params);
        message.success('User updated');
      } else {
        await axios.post(`${API_URL}/users/register`, params);
        message.success('User added');
      }

      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      message.error('Submission failed');
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.toLowerCase().includes(search.toLowerCase())
    );
  });

  const columns = [
    { title: 'UserName', dataIndex: 'UserName', key: 'UserName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Password', dataIndex: 'password', key: 'password' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} />
          <Button icon={<EditOutlined />} onClick={() => handleEditUser(record)} />
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record.email)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <h2>User Management</h2>

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by email or phone"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredUsers.map((u, i) => ({ key: i, ...u }))}
        loading={loading}
        bordered
      />

      {/* Floating Add User Button */}
      <div style={{ position: 'fixed', bottom: 30, right: 30 }}>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleAddUser}
        />
      </div>

      {/* Modal Form */}
      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalSubmit}
        okText="Submit"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="UserName"
            name="UserName"
            rules={[{ required: true, message: 'Please enter username' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewUsers;
