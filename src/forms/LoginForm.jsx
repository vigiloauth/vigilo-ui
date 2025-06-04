import { useState } from 'react';
import FlexContainer from '../components/FlexContainer';
import FormInput from '../components/FormInput';
import {
  Form,
  Button,
  Checkbox,
  Typography,
  Row,
  Col,
  Divider,
  message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
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
      console.log(data);
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
      initialValues={{ remember: true }}
      layout="vertical"
      onFinish={onFinish}
    >
      <FormInput
        placeholder="Username"
        name="username"
        required={true}
        message=""
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        icon={<UserOutlined className="site-form-item-icon" />}
      />

      <FormInput
        placeholder="Password"
        name="password"
        required={true}
        message=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isPassword={true}
        icon={<LockOutlined className="site-form-item-icon" />}
      />

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

      <FlexContainer vertical={true} height="10px" className="footer">
        <Text type="secondary">
          Don't have an account? <Link href="/signup">Sign up</Link>
        </Text>
      </FlexContainer>
    </Form>
  );
}

export default LoginForm;
