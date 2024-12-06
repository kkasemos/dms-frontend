'use client'

import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Alert, Modal, message } from 'antd';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isForgotPasswordVisible, setForgotPasswordVisible] = useState(false);

  const handleLogin = (values: { username: string; password: string }) => {
    setLoading(true);
    setError('');
    // Simulate login API call
    setTimeout(() => {
      if (values.username === 'admin' && values.password === 'admin123') {
        message.success('Login successful!');
      } else {
        setError('Invalid username or password.');
      }
      setLoading(false);
    }, 1000);
  };

  const handleForgotPassword = (email: string) => {
    // Simulate password reset API call
    message.success(`Password reset email sent to ${email}`);
    setForgotPasswordVisible(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <Form
        name="login"
        onFinish={handleLogin}
        layout="vertical"
      >
        <Form.Item
          label="Username or Email"
          name="username"
          rules={[{ required: true, message: 'Please enter your username or email!' }]}
        >
          <Input placeholder="Enter your username or email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" initialValue={true}>
          <Checkbox>Remember Me</Checkbox>
        </Form.Item>

        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Log In
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="link" onClick={() => setForgotPasswordVisible(true)}>
            Forgot Password?
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Forgot Password"
        visible={isForgotPasswordVisible}
        onCancel={() => setForgotPasswordVisible(false)}
        footer={null}
      >
        <Form
          name="forgot_password"
          onFinish={(values) => handleForgotPassword(values.email)}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Enter your registered email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
