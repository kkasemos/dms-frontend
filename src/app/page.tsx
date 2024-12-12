'use client'; // Required for client-side interactivity in Next.js App Router

import React, { useState } from 'react';
import { Upload, Button, Table, Input, Space, Tag, List, Modal, message } from 'antd';
import { UploadOutlined, SearchOutlined, FileOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function DocumentsPage() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle document upload
  const handleUpload = ({ file }) => {
    const newFile = {
      key: uploadedFiles.length + 1,
      name: file.name,
      type: file.type,
      uploadDate: new Date().toLocaleString(),
      tags: ['new'], // Example metadata
    };

    setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
    setRecentDocuments((prevDocs) => [newFile, ...prevDocs.slice(0, 4)]); // Update recent documents
    message.success(`Uploaded ${file.name} successfully.`);
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchQuery(value.toLowerCase());
  };

  // Handle document preview
  const handlePreview = (file) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  // Close preview modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  // Filter documents based on search query
  const filteredFiles = uploadedFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
  );

  // Columns for the documents table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Upload Date',
      dataIndex: 'uploadDate',
      key: 'uploadDate',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, file) => (
        <Button type="link" onClick={() => handlePreview(file)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Document Management</h2>

      {/* Search Bar */}
      <Space direction="vertical" style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search documents by name, type, or tags"
          onSearch={handleSearch}
          enterButton={<SearchOutlined />}
        />
      </Space>

      {/* Upload Section */}
      <Upload customRequest={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload Document</Button>
      </Upload>

      {/* Document List Table */}
      <Table
        columns={columns}
        dataSource={filteredFiles}
        rowKey="key"
        style={{ marginTop: 24 }}
      />

      {/* Recently Accessed Documents */}
      <h3 style={{ marginTop: 32 }}>Recently Accessed Documents</h3>
      <List
        itemLayout="horizontal"
        dataSource={recentDocuments}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<FileOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
              title={<a onClick={() => handlePreview(item)}>{item.name}</a>}
              description={`Last accessed: ${item.uploadDate}`}
            />
          </List.Item>
        )}
      />

      {/* Modal for Document Preview */}
      <Modal
        title="Document Preview"
        visible={isModalOpen}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedFile ? (
          <>
            <p>
              <strong>Name:</strong> {selectedFile.name}
            </p>
            <p>
              <strong>Type:</strong> {selectedFile.type}
            </p>
            <p>
              <strong>Uploaded:</strong> {selectedFile.uploadDate}
            </p>
            <p>
              <strong>Tags:</strong> {selectedFile.tags.join(', ')}
            </p>
          </>
        ) : (
          <p>No file selected.</p>
        )}
      </Modal>
    </div>
  );
}
