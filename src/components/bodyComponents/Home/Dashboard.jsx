import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Table, Statistic, Button } from 'antd';
import { UserOutlined, MessageOutlined, LineChartOutlined, InfoCircleOutlined ,FileOutlined} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../../context/AppContext';

const Dashboard = () => {
  // Sample data for stats and charts
  const { Title } = Typography;
  const { fetchUsers,fetchFiles, files,Chatusers,DailyChats,fetchChats,questions ,weekChats,ChatsList,fetchchatUsers,fetchQueestions} = useAppContext();
  useEffect(() => {
    
    fetchchatUsers();
      fetchFiles();
      fetchChats();
      fetchQueestions()
    
    const interval = setInterval(() => {
      fetchchatUsers();
      fetchFiles();
      fetchChats();
      fetchQueestions()
    }, 30000);
  
   
    return () => clearInterval(interval);
  }, []);
    const [chartPeriod, setChartPeriod] = useState('weekly'); // 'weekly' or 'monthly'

  // Function to format date to dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const topQuestions = [
    { key: 1, question: "What is warranty?", count: 34 },
    { key: 2, question: "What is noise?", count: 21 },
    { key: 3, question: "What is AI?", count: 15 },
  ];

  // Use real API data
  const weeklyChatTrendData = ChatsList.slice(0, 4).map(item => ({
    date: formatDate(item.date),
    chats: item.total_chats,
  }));

  const monthlyChatTrendData = ChatsList.slice(0, 7).map(item => ({
    date: formatDate(item.date),
    chats: item.total_chats,
  }));

  const chatTrendData = chartPeriod === 'weekly' ? weeklyChatTrendData : monthlyChatTrendData;

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
              value={Chatusers.length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
           <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Uploads Files"
              value={files.length}
              prefix={<FileOutlined />}
              
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Chats"
              value={weekChats+DailyChats}
              prefix={<MessageOutlined />}
            />
          </Card>
        </Col>
     
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Today's Chats"
              value={ DailyChats}
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Chat Trend Chart */}
      <Card 
        title="Chat Activity" 
        style={{ marginTop: 24 }}
        extra={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button 
              type={chartPeriod === 'weekly' ? 'primary' : 'default'}
              size="small"
              onClick={() => setChartPeriod('weekly')}
            >
              Weekly
            </Button>
            <Button 
              type={chartPeriod === 'monthly' ? 'primary' : 'default'}
              size="small"
              onClick={() => setChartPeriod('monthly')}
            >
              Monthly
            </Button>
          </div>
        }
      >
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
          dataSource={questions.slice(0,5)}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
