import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

const StyledApp = styled.main`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type='horizontal'>
            <Heading as='h1'>The Wild Oasis</Heading>
            <div>
              <Heading as='h3'>Check in and check out</Heading>
              <Button>Check in</Button>
              <Button variation='secondary' size='small'>
                Check Out
              </Button>
            </div>
          </Row>

          <Row>
            <Heading as='h2'>Form</Heading>
            <form>
              <Input type='number' placeholder='Number of guests' />
              <Input type='number' placeholder='Number of guests' />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
