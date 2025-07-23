import React, { useEffect, useState, useCallback } from 'react';
import {
  Table,
  Button,
  message,
  Input,
  Form,
  Space,
  Popconfirm,
  Modal,
  Select,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useAppContext } from '../../../context/AppContext';

const { Option } = Select;

const ViewUsers = () => {
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const API_URL = 'http://3.110.224.17:8000';
  const { fetchUsers, users } = useAppContext();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (email) => {
    try {
      await axios.delete(`${API_URL}/user/delete`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: new URLSearchParams({ email }),
      });

      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error(error.response?.data || error.message);
      message.error('Delete failed');
    }
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      const params = new URLSearchParams({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      });
      

      // const headers = { accept: 'application/json' };

      if (editingUser) {
        await axios.put(`${API_URL}/user/update`, params, { 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          } });
        message.success('User updated');
      } else {
        await axios.post(`${API_URL}/user/create`, params, {  headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }  });
        message.success('User added');
      }

      closeModal();
      fetchUsers();
    } catch (error) {
      message.error('Submission failed');
    }
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleSendEmail = async (user) => {
    try {
      await axios.post(`${API_URL}/user/send-credentials`, {
        email: user.email,
        name: user.name,
        password: user.password,
      });
      message.success('Email sent successfully');
    } catch (error) {
      message.error('Failed to send email');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    form.resetFields();
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { title: 'UserName', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record.email)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
          {/* {record.role === 'sales' && (
            <Button type="default" onClick={() => handleSendEmail(record)}>
              Send Email
            </Button>
          )} */}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User</h2>

      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by email or name"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Create User
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredUsers.map((u, i) => ({ key: i, ...u }))}
        loading={loading}
        bordered
      />

      <Modal
        title={editingUser ? 'Edit User' : 'Create User'}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleModalSubmit}
        okText="Save"
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="UserName"
            name="name"
            rules={[{ required: true, message: 'Please enter username' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input
              disabled={!!editingUser}
              title={editingUser ? 'Email cannot be changed' : ''}
            />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select placeholder="Select a role">
              <Option value="admin">Admin</Option>
              <Option value="sales">Sales</Option>
            </Select>
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
