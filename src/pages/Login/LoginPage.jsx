import { Card, Typography } from 'antd';
import './LoginPage.scss';

import FlexContainer from '../../components/FlexContainer';
import LoginForm from '../../forms/LoginForm';

const { Title, Text } = Typography;

function LoginPage() {
  const defaultSigninMessage = 'Please sign in to continue';

  return (
    <FlexContainer height="100%">
      <Card className="login-card" variant="borderless">
        <FlexContainer vertical={true}>
          <Title className="login-title">Welcome Back</Title>
          <Text className="login-subtitle">{defaultSigninMessage}</Text>
        </FlexContainer>
        <LoginForm />
      </Card>
    </FlexContainer>
  );
}

export default LoginPage;
