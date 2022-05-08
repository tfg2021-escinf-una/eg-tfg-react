import styled from 'styled-components';
import { ApplicationRouter } from './routes';
const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <ApplicationRouter />
    </StyledApp>
  );
}

export default App;
