import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import {
  Form,
  Divider,
  Button,
  Typography,
  Input,
  message,
  Select,
} from 'antd';
import FlexContainer from '../components/FlexContainer';
import fetchPasswordPolicy from '../service/config_service';
import { registerUser } from '../service/user_service';
import './form.scss';

const { Text, Link } = Typography;

function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roles: ['ADMIN'],
  });

  const [passwordPolicy, setPasswordPolicy] = useState({
    requireUpper: true,
    requireNumber: true,
    requireSymbol: true,
    minLength: 8,
  });

  const [loading, setLoading] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPasswordFormatError, setShowPasswordFormatError] = useState(false);
  const [showEmailFormatError, setShowEmailFormatError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const data = fetchPasswordPolicy();
    setPasswordPolicy(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (formData.password !== '' && passwordConfirm !== '') {
      setShowPasswordFormatError(passwordConfirm !== formData.password);
    } else {
      setShowPasswordFormatError(false);
    }
  }, [formData.password, passwordConfirm]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const isValidEmailFormat = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;

    setFormData((prev) => ({
      ...prev,
      email,
    }));

    setShowEmailFormatError(email !== '' && !isValidEmailFormat(email));
  };

  const onFinish = async () => {
    setLoading(true);
    if (formData.password !== passwordConfirm) {
      setShowPasswordFormatError(true);
      setLoading(false);
      return;
    }

    if (!isValidEmailFormat(formData.email)) {
      setShowEmailFormatError(true);
      setLoading(false);
      return;
    }

    try {
      await registerUser(formData);
      message.success(
        'Account created. Please check your email to verify your account.'
      );
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFirstAndLastNameInput = () => {
    return (
      <FlexContainer
        height="100%"
        width="100%"
        vertical={false}
        justify="space-between"
        gap="10px"
      >
        <Form.Item
          className="registration-form-item"
          name="firstName"
          rules={[{ required: true, message: '' }]}
        >
          <Input
            placeholder="first name"
            onChange={handleChange}
            value={formData.firstName}
            name="firstName"
          />
        </Form.Item>

        <Form.Item
          className="registration-form-item"
          name="lastName"
          rules={[{ required: true, message: '' }]}
        >
          <Input
            name="lastName"
            placeholder="last name"
            onChange={handleChange}
            value={formData.lastName}
          />
        </Form.Item>
      </FlexContainer>
    );
  };

  const renderUsernameInput = () => {
    return (
      <FlexContainer height="100%" width="100%" vertical>
        <Form.Item
          className="registration-form-item"
          rules={[{ required: true, message: '' }]}
          name="username"
        >
          <Input
            name="username"
            placeholder="username"
            onChange={handleChange}
            value={formData.username}
          />
        </Form.Item>
      </FlexContainer>
    );
  };

  const renderEmailInput = () => {
    return (
      <FlexContainer height="100%" width="100%" vertical>
        <Form.Item
          className="registration-form-item"
          rules={[
            {
              required: true,
              message: '',
            },
          ]}
          name="email"
          validateStatus={showEmailFormatError ? 'error' : ''}
          help={showEmailFormatError ? 'Invalid email format' : ''}
        >
          <Input
            name="email"
            placeholder="email"
            onChange={handleEmailChange}
            value={formData.email}
          />
        </Form.Item>
      </FlexContainer>
    );
  };

  const renderPasswordInputs = () => {
    const hasUpper = /[A-Z]/.test(formData.password);
    const hasNumber = /\d/.test(formData.password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    const hasMinLength = formData.password.length >= passwordPolicy.minLength;

    const requirements = [
      {
        text: `At least ${passwordPolicy.minLength} characters`,
        met: hasMinLength,
        required: true,
      },
      {
        text: 'One uppercase letter',
        met: hasUpper,
        required: passwordPolicy.requireUpper,
      },
      {
        text: 'One number',
        met: hasNumber,
        required: passwordPolicy.requireNumber,
      },
      {
        text: 'One special character',
        met: hasSymbol,
        required: passwordPolicy.requireSymbol,
      },
    ];

    const showPolicy = formData.password.length > 0;

    return (
      <FlexContainer height="100%" width="100%" vertical>
        <Form.Item
          className="registration-form-item"
          rules={[{ required: true, message: '' }]}
          name="password"
        >
          <Input.Password
            placeholder="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            status={showPasswordFormatError ? 'error' : ''}
          />
        </Form.Item>

        <Form.Item
          name="passwordConfirm"
          className="registration-form-item"
          rules={[
            {
              required: true,
              message: '',
            },
          ]}
          validateStatus={showPasswordFormatError ? 'error' : ''}
          help={showPasswordFormatError ? 'Passwords do not match' : ''}
        >
          <Input.Password
            name="passwordConfirm"
            placeholder="confirm password"
            onChange={(e) => handlePasswordConfirmChange(e)}
            value={passwordConfirm}
            status={showPasswordFormatError ? 'error' : ''}
          />
        </Form.Item>
        <FlexContainer justify="start" width="100%">
          {showPolicy && (
            <div style={{ marginTop: '8px' }}>
              {requirements.map(
                (req) =>
                  req.required && (
                    <div key={req.text} className="password-requirement">
                      {req.met ? (
                        <CheckCircleFilled
                          style={{
                            color: '#52c41a',
                            marginRight: '8px',
                            fontSize: '12px',
                          }}
                        />
                      ) : (
                        <CloseCircleFilled
                          style={{
                            color: '#ff4d4f',
                            marginRight: '8px',
                            fontSize: '12px',
                          }}
                        />
                      )}
                      <Text
                        type={req.met ? 'success' : 'secondary'}
                        style={{ fontSize: '13px', color: '#434c5e' }}
                      >
                        {req.text}
                      </Text>
                    </div>
                  )
              )}
            </div>
          )}
        </FlexContainer>
      </FlexContainer>
    );
  };

  const renderRollSelection = () => {
    const adminRole = 'ADMIN';
    const userRole = 'USER';

    return (
      <FlexContainer height="100%" width="100%" vertical>
        <Form.Item
          name="roles"
          className="registration-form-item"
          rules={[{ message: '' }]}
        >
          <Select
            defaultValue={adminRole}
            disabled
            options={[
              { value: adminRole, label: 'admin' },
              { value: userRole, label: 'user' },
            ]}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </FlexContainer>
    );
  };

  return (
    <Form
      className="form form--registration"
      name="register"
      layout="vertical"
      onFinish={onFinish}
    >
      {renderFirstAndLastNameInput()}
      {renderUsernameInput()}
      {renderEmailInput()}
      {renderRollSelection()}
      {renderPasswordInputs()}

      <Divider plain />

      <Form.Item className="form">
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          disabled={loading}
          className="button"
        >
          Sign Up
        </Button>
      </Form.Item>

      <FlexContainer vertical height="10px" className="footer">
        <Text type="secondary">
          Already have an account? <Link href="/">Login</Link>
        </Text>
      </FlexContainer>
    </Form>
  );
}

export default RegistrationForm;
