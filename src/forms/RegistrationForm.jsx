import { useState } from 'react';
import { Form, Divider, Button, Typography } from 'antd';
import FlexContainer from '../components/FlexContainer';
import FormInput from '../components/FormInput';
import vigiloLogo from '../assets/vigilo_auth_logo.svg';
import './form.scss';

const { Title, Text, Link } = Typography;

function RegistrationForm({ passwordPolicy, loading }) {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    password: '',
    streetAddress: '',
    locality: '',
    region: '',
    postalCode: '',
    country: '',
  });

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFinish = async () => {
    try {
      data = await registerUser(formData);
    } catch (err) {
    } finally {
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
        <FormInput
          placeholder="First Name"
          name="firstName"
          required={true}
          className="registration-form-item"
          message=""
          value={formData.firstName}
          onChange={handleChange}
          inputHeight="50px"
        />
        <FormInput
          placeholder="Last Name"
          name="lastName"
          required={true}
          className="registration-form-item"
          message=""
          value={formData.lastName}
          onChange={handleChange}
          inputHeight="50px"
        />
      </FlexContainer>
    );
  };

  const renderEmailInput = () => {
    return (
      <FlexContainer height="100%" width="100%" vertical={true}>
        <FormInput
          placeholder="Email"
          name="email"
          required={true}
          className="registration-form-item"
          message=""
          width="100%"
          value={formData.email}
          onChange={handleChange}
          inputHeight="50px"
          inputWidth="100%"
        />
      </FlexContainer>
    );
  };

  const renderPasswordInputs = () => {
    return (
      <FlexContainer height="100%" width="100%" vertical={true}>
        <FormInput
          placeholder="Password"
          name="password"
          required={true}
          className="registration-form-item"
          message=""
          width="100%"
          value={formData.password}
          onChange={handleChange}
          inputHeight="50px"
          inputWidth="100%"
          isPassword={true}
        />
        <FormInput
          placeholder="Confirm Password"
          name="passwordConfirm"
          required={true}
          className="registration-form-item"
          message=""
          width="100%"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          inputHeight="50px"
          inputWidth="100%"
          isPassword={true}
        />
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
      <FlexContainer vertical={true} justify="center" align="center">
        <img
          src={vigiloLogo}
          alt="Vigilo Auth Logo"
          style={{ height: '110px' }}
        />
        <Title level={3} className="registration-title" style={{ margin: 0 }}>
          Create your account
        </Title>
      </FlexContainer>

      {renderFirstAndLastNameInput()}
      {renderEmailInput()}
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

      <FlexContainer vertical={true} height="10px" className="footer">
        <Text type="secondary">
          Already have an account? <Link href="/">Login</Link>
        </Text>
      </FlexContainer>
    </Form>
  );
}

export default RegistrationForm;
