import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';

const StyledApp = styled.div`
  background-color: orange;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as='h1'>The Wild Oasis</Heading>
        <Button>Check in</Button>
        <Heading as='h2'>An h2 elem</Heading>
        <Input type='number' placeholder='Number of guests' />
        <Heading as='h3'>A h3 element</Heading>
      </StyledApp>
    </>
  );
}

export default App;
