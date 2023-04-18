import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setLoading(true);
    console.log('Received values of form: ', values);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Form form={form} onFinish={handleSubmit} className="login-form">
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="#">
              忘记密码
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
            >
              登录
            </Button>
            或者 <a href="#">注册</a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
