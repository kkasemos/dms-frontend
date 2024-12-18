'use client'

import React, { useState, useEffect } from 'react';
import { Table, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [recentDocuments, setRecentDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:3000/documents');
        if (response.ok) {
          const data = await response.json();
          const formattedDocuments = data.map((doc) => ({
            id: doc.documentID,
            name: doc.title,
            lastModified: new Date(doc.uploadTimestamp).toISOString().split('T')[0],
          }));
          setDocuments(formattedDocuments);
        } else {
          message.error('Failed to fetch documents.');
        }
      } catch (error) {
        message.error(`An error occurred: ${error.message}`);
      }
    };

    fetchDocuments();
  }, []);

  const handleUpload = async (file) => {
    const fileType = file.name.split('.').pop();
    const reader = new FileReader();

    reader.onload = async () => {
      const base64Content = reader.result.split(',')[1]; // Extract Base64 content

      const requestBody = {
        title: file.name,
        content: base64Content,
        fileType: fileType.toUpperCase(),
        ownerID: 1, // Assume ownerID is 1 for demonstration purposes
      };

      try {
        const response = await fetch('http://localhost:3000/documents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data = await response.json();
          const newDocument = {
            id: data.documentID,
            name: data.title,
            lastModified: new Date(data.uploadTimestamp).toISOString().split('T')[0],
          };
          setDocuments([...documents, newDocument]);
          message.success(`${file.name} uploaded successfully.`);
        } else {
          message.error(`${file.name} upload failed. Please try again.`);
        }
      } catch (error) {
        message.error(`An error occurred: ${error.message}`);
      }
    };

    reader.readAsDataURL(file);
    return false; // Prevent auto-upload
  };

  const documentColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a href={`/documents/${record.id}`}>{text}</a>,
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
    },
  ];

  return (
    <div>
      <h2>Document List</h2>
      <Upload beforeUpload={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload Document</Button>
      </Upload>

      <h3 style={{ marginTop: '20px' }}>All Documents</h3>
      <Table
        columns={documentColumns}
        dataSource={documents}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}