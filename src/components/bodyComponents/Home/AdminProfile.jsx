import React, { useEffect } from 'react';
import { Form, Input, Button, message, Card } from 'antd';

const AdminProfile = () => {
  const [form] = Form.useForm();

  // Simulated user data
  const userData = {
    name: 'Rajan Raj',
    phoneNumber: '9876543210',
    email: 'admin@example.com',
  };

  useEffect(() => {
    form.setFieldsValue(userData);
  }, [form]);

  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    // Submit logic here (API call etc.)
    message.success('Profile updated successfully!');
  };

  return (
    <Card title="Edit Profile" style={{ maxWidth: 500, margin: '0 auto',marginTop:"2%" }}>
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

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          label="Email ID"
          name="email"
        >
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
    </Card>
  );
};

export default AdminProfile;
