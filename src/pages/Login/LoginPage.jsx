import React from 'react';
import { Card, Typography } from 'antd';
import vigiloLogo from '../../assets/vigilo_auth_logo.svg';
import './LoginPage.scss';

import FlexContainer from '../../components/FlexContainer';
import LoginForm from '../../forms/LoginForm';

const { Title, Text } = Typography;

function LoginPage() {
  const defaultSigninMessage = 'Please sign in to continue';

  return (
    <FlexContainer height="100%">
      <Card className="login-card" variant="borderless">
        <FlexContainer vertical>
          <img
            src={vigiloLogo}
            alt="Vigilo Auth Logo"
            className="vigilo-logo"
          />
          <Title className="login-title">Welcome Back</Title>
          <Text className="login-subtitle">{defaultSigninMessage}</Text>
        </FlexContainer>
        <LoginForm />
      </Card>
    </FlexContainer>
  );
}

export default LoginPage;
