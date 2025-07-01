import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Table, Statistic } from 'antd';
import { UserOutlined, MessageOutlined, LineChartOutlined, InfoCircleOutlined ,FileOutlined} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

const Dashboard = () => {
  // Sample data for stats and charts
  const topQuestions = [
    { key: 1, question: "What is warranty?", count: 34 },
    { key: 2, question: "What is noise?", count: 21 },
    { key: 3, question: "What is AI?", count: 15 },
  ];

  const chatTrendData = [
    { date: 'Jun 24', chats: 20 },
    { date: 'Jun 25', chats: 40 },
    { date: 'Jun 26', chats: 35 },
    { date: 'Jun 27', chats: 55 },
    { date: 'Jun 28', chats: 60 },
    { date: 'Jun 29', chats: 48 },
    { date: 'Jun 30', chats: 70 },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Dashboard </Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        {/* <Col xs={24} sm={12} md={6}> */}
          {/* <Card>
            <Statistic
              title="Sub_Admin"
              value={2}
              prefix={<UserOutlined />}
              // valueStyle={{ color: '#cf1322' }}
            />
          </Card> */}
        {/* </Col> */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total ChatUsers"
              value={45}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
           <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Uploads Files"
              value={28}
              prefix={<FileOutlined />}
              
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Chats"
              value={1580}
              prefix={<MessageOutlined />}
            />
          </Card>
        </Col>
     
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Today’s Chats"
              value={120}
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Chat Trend Chart */}
      <Card title="Chat Activity - Last 7 Days" style={{ marginTop: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chatTrendData} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="chats" stroke="#1890ff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Questions Table */}
      <Card title="Top Asked Questions" style={{ marginTop: 24 }}>
        <Table
          columns={[
            { title: 'Question', dataIndex: 'question', key: 'question' },
            { title: 'Asked Count', dataIndex: 'count', key: 'count' },
          ]}
          dataSource={topQuestions}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
