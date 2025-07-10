import React, { useEffect } from 'react';
import { Form, Input, Button, message, Card, Spin } from 'antd';
import { useAppContext } from '../../../context/AppContext';
import axios from 'axios';

const API_URL = "http://3.110.224.17:8000";

const AdminProfile = () => {
  const [form] = Form.useForm();
  const { users, fetchUsers, loading } = useAppContext();
  const email = localStorage.getItem('emailId'); // Make sure this matches your login logic

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length && email) {
      const user = users.find(u => u.email === email);
      if (user) {
        form.setFieldsValue({
          name: user.name,
          phoneNumber: user.phoneNumber, // <-- include this if your user object has it
          email: user.email,
        });
      }
    }
  }, [users, email, form]);

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }
    try {
      const params = new URLSearchParams();
      params.append('name', values.name);
      params.append('email', email);
      params.append('password', values.password);
      // params.append('phoneNumber', values.phoneNumber); // include if needed

      await axios.put(`${API_URL}/user/update`, params, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      message.success('Profile updated successfully!');
    } catch (err) {
      message.error('Failed to update profile');
    }
  };

  return (
    <Card title="Edit Profile" style={{ maxWidth: 500, margin: '0 auto', marginTop: '2%' }}>
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          {/* <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item> */}
          <Form.Item label="Email ID" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter a password' }]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your password' }]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default AdminProfile;
