import { Typography } from 'antd';
import FlexContainer from '../../components/FlexContainer';

const { Text } = Typography;

function DashboardPage() {
  return (
    <FlexContainer width="100%" height="100vh">
      <Text>Hello from the dashboard page</Text>
    </FlexContainer>
  );
}

export default DashboardPage;
