import React from 'react';
import { Layout, Menu, Input, Avatar, Badge, Breadcrumb } from 'antd';
import {
  FileOutlined,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import './globals.css'; // Ensure custom global CSS for Ant Design overrides
import Sider from 'antd/es/layout/Sider';
import MenuItem from 'antd/es/menu/MenuItem';
import { Content, Header } from 'antd/es/layout/layout';
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem';

// const { Header, Content, Sider } = Layout;

const Sidebar = () => (
  <Sider collapsible>
    <div
      className="logo"
      style={{ color: '#fff', padding: '16px', textAlign: 'center' }}
    >
      <FolderOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
      <span>Document Manager</span>
    </div>
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <MenuItem key="1" icon={<FileOutlined />}>
        <Link href="/documents">Documents</Link>
      </MenuItem>
      <MenuItem key="2" icon={<SearchOutlined />}>
        <Link href="/search">Search</Link>
      </MenuItem>
      <MenuItem key="3" icon={<SettingOutlined />}>
        <Link href="/settings">Settings</Link>
      </MenuItem>
    </Menu>
  </Sider>
);

const HeaderBar = () => (
  <Header
    style={{
      padding: 0,
      background: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <div style={{ marginLeft: '16px', flex: 1 }}>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search documents, tags, or metadata"
        style={{ width: '400px' }}
      />
    </div>
    <div
      style={{ marginRight: '16px', display: 'flex', alignItems: 'center' }}
    >
      <Badge count={5}>
        <BellOutlined style={{ fontSize: '20px', marginRight: '24px' }} />
      </Badge>
      <Avatar icon={<UserOutlined />} />
    </div>
  </Header>
);

const BreadcrumbNav = ({ items }) => (
  <Breadcrumb style={{ margin: '16px 16px' }}>
    {items.map((item, index) => (
      <BreadcrumbItem key={index}>{item}</BreadcrumbItem>
    ))}
  </Breadcrumb>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head />
    <body>
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <HeaderBar />
        <BreadcrumbNav items={["Home", "Documents"]} />
        <Content style={{ margin: '16px 16px' }}>
          <div
            style={{
              padding: 24,
              background: '#fff',
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
    </body>
    </html>
  );
}



// Ensure you create app/search/page.js and app/settings/page.js for other routes.
