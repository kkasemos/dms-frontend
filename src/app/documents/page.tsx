'use client'

import React, { useState } from 'react';
import { Table, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Project Plan.docx', lastModified: '2024-12-10' },
    { id: 2, name: 'Budget.xlsx', lastModified: '2024-12-09' },
  ]);

  const [recentDocuments, setRecentDocuments] = useState([
    { id: 3, name: 'Meeting Notes.pdf', lastAccessed: '2024-12-11' },
    { id: 4, name: 'Design Specs.pptx', lastAccessed: '2024-12-10' },
  ]);

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
        const response = await fetch('http://localhost:8080/documents', {
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

  const recentColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a href={`/documents/${record.id}`}>{text}</a>,
    },
    {
      title: 'Last Accessed',
      dataIndex: 'lastAccessed',
      key: 'lastAccessed',
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

      <h3 style={{ marginTop: '20px' }}>Recently Accessed</h3>
      <Table
        columns={recentColumns}
        dataSource={recentDocuments}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
