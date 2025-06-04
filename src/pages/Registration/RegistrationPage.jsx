import { useState, useEffect } from 'react';
import { Typography, Row, Col, Card } from 'antd';
import FlexContainer from '../../components/FlexContainer';
import RegistrationForm from '../../forms/RegistrationForm';
import { fetchPasswordPolicy } from '../../service/config_service';

const { Text, Title } = Typography;

function RegistrationPage() {
  const [loading, setLoading] = useState(false);
  const [passwordPolicy, setPasswordPolicy] = useState({
    requireUpper: true,
    requireNumber: true,
    requireSymbol: true,
    minLength: 8,
  });

  useEffect(() => {
    setLoading(true);
    const data = fetchPasswordPolicy();
    setPasswordPolicy(data);
    setLoading(false);
  }, []);

  return (
    <FlexContainer width="100%" height="100vh" vertical={true}>
      <Row style={{ width: '100%', height: '100%' }}>
        <Col span={12}>
          <FlexContainer
            justify="center"
            align="center"
            width="100%"
            height="100%"
          >
            <Text>left</Text>
          </FlexContainer>
        </Col>

        <Col span={12}>
          <FlexContainer
            justify="center"
            align="center"
            width="100%"
            height="100%"
          >
            <RegistrationForm
              passwordPolicy={passwordPolicy}
              loading={loading}
            />
          </FlexContainer>
        </Col>
      </Row>
    </FlexContainer>
  );
}

export default RegistrationPage;
