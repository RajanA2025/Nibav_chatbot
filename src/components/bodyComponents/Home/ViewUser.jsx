

import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import {
  Table,
  Button,
  message,
  Input,
  Form,
  Space,
  Popconfirm,
  Modal,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const ViewUsers = () => {
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState('');
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = "http://3.110.224.17:8000";
  const { fetchUsers ,users} = useAppContext();
  
const Role =localStorage.getItem("Role")
  useEffect(() => {
    fetchUsers();
  }, []);   

  const handleDeleteUser = async (email) => {
    try {
      await axios.request({
        method: 'delete',
        url: `${API_URL}/user/delete`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: new URLSearchParams({ email }),  // form-encoded body
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
      const params = new URLSearchParams();
      params.append('name', values.name);
      params.append('email', values.email);
      params.append('password', values.password);
      params.append('role', "sales");


      const headers = {
       
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      
      if (editingUser) {
        await axios.put(`${API_URL}/user/update`, params, { headers });
        message.success('User updated');
      } else {
        await axios.post(`${API_URL}/user/create`, params, { headers });
        message.success('User added');
      }

      setIsModalOpen(false);
      setEditingUser(null);
      form.resetFields();
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
        password: user.password, // Make sure you have this field
      });
      message.success('Email sent successfully');
    } catch (error) {
      message.error('Failed to send email');
    }
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
          {record.role === "sales" && (
            <Button
              type="default"
              onClick={() => handleSendEmail(record)}
            >
              Send Email
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User</h2>

      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by email or phone"
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
        onCancel={() => {
          setIsModalOpen(false);
          setEditingUser(null);
          form.resetFields();
        }}
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
          {/* <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please enter phone' }]}
          >
            <Input />
          </Form.Item> */}
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

