import React from 'react';
import { Typography, Card } from 'antd';
import FlexContainer from '../../components/FlexContainer';
import RegistrationForm from '../../forms/RegistrationForm';
import vigiloLogo from '../../assets/vigilo_auth_logo.svg';
import './RegistrationPage.scss';

const { Title } = Typography;

function RegistrationPage() {
  return (
    <FlexContainer height="100%" className="registration-container">
      <Card className="registration-card" variant="borderless">
        <FlexContainer vertical justify="center" align="center">
          <img
            src={vigiloLogo}
            alt="Vigilo Auth Logo"
            className="vigilo-logo"
          />
          <Title level={2} className="registration-title">
            Create your account
          </Title>
        </FlexContainer>
        <RegistrationForm />
      </Card>
    </FlexContainer>
  );
}

export default RegistrationPage;
