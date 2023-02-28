import React, { FC } from 'react';
import styled from 'styled-components';

const Loading: FC = () => {
  return (
    <Container>
      <LoadingSpinner data-testid="loading-spinner" />
    </Container>
  )
}

const Container = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
`;

const LoadingSpinner = styled.div`
  width: 88px;
  height: 88px;
  border: 8px solid white;
  border-top: 8px solid var(--primary);
  border-right: 8px solid var(--primary);
  border-left: 8px solid var(--primary);
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
`;

export { Loading };
export default Loading;