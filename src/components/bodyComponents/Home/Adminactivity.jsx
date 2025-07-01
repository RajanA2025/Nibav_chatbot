import React, { useEffect, useState } from 'react';
import { Table, Button, Upload, message, Popconfirm } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const API_URL = "http://65.0.113.12:8000";

const AdminActivity = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
const adminAuth =localStorage.getItem("Role")
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/files`);
      setFiles(res.data.files || []); 
    } catch (error) {
      message.error('Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };
  
  const location = useLocation();
  const currentPath = location.pathname;

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`${API_URL}/admin/delete/${filename}`, {
        headers: {
          accept: 'application/json',
        },
      });
      message.success(`${filename} deleted successfully`);
      fetchFiles();
    } catch (error) {
      message.error(`Failed to delete ${filename}`);
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${API_URL}/admin/upload`, formData, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success(`${file.name} uploaded successfully`);
      fetchFiles();
    } catch (error) {
      message.error(`Failed to upload ${file.name}`);
    }

    // Prevent default Upload behavior
    return false;
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const columns = [
    {
      title: 'File Name',
      dataIndex: 'filename',
      key: 'filename',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        // files.length > 1 ? (
        <Popconfirm
          title={`Delete ${record.filename}?`}
          onConfirm={() => handleDelete(record.filename)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />} disabled={files.length <= 1}>
            Delete
          </Button>
        </Popconfirm>
        // )
        // : null
      ),
    },
  ];


  const columnsSales = [
    {
      title: 'File Name',
      dataIndex: 'filename',
      key: 'filename',
    }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Files Manager- ({files.length})</h2>
      {adminAuth == "Admin" ? 
      <Upload beforeUpload={handleUpload} showUploadList={false}>
        <Button type="primary" icon={<UploadOutlined />} style={{ marginBottom: '1rem' }}>
          Upload File
        </Button>
      </Upload>
      : null}

      <Table
 columns={currentPath === '/admin/activity' ? columns : columnsSales}
  dataSource={files.map((file, index) => ({ key: index, filename: file }))} // ✅ No change needed here
  loading={loading}
  bordered
/>

    </div>
  );
};

export default AdminActivity;
