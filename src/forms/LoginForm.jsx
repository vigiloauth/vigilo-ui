import { React, useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  Form,
  Button,
  Checkbox,
  Typography,
  Row,
  Col,
  Divider,
  message,
  Input,
} from 'antd';
import FlexContainer from '../components/FlexContainer';
import { authenticateUser } from '../service/user_service';
import { useAuth } from '../context/AuthContext';
import './form.scss';

const { Text, Link } = Typography;

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = async () => {
    setLoading(true);
    try {
      const data = await authenticateUser({ username, password });
      if (data) {
        message.success('Login successful. You are being redirected');
        login(data, data.access_token, data.refresh_token);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="form"
      name="login"
      initialValues={{ remember: false }}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '' }]}
        style={{ width: '100%' }}
      >
        <Input
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="username"
        rules={[{ required: true, message: '' }]}
        style={{ width: '100%' }}
      >
        <Input
          name="Password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Divider plain />

      <Form.Item className="form">
        <Row justify="space-between" align="middle">
          <Col>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <Link href="/reset-password">Forgot password?</Link>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          disabled={loading}
          className="button"
        >
          Sign In
        </Button>
      </Form.Item>

      <FlexContainer vertical height="10px" className="footer">
        <Text type="secondary">
          Don&apos;t have an account? <Link href="/signup">Sign up</Link>
        </Text>
      </FlexContainer>
    </Form>
  );
}

export default LoginForm;
