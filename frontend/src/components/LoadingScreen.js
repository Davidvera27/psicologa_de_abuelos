// LoadingScreen.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 100px auto;
  width: 50px;
  height: 50px;
  border: 8px solid ${props => props.theme.palette.primary.light};
  border-top: 8px solid ${props => props.theme.palette.primary.main};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(145deg, rgba(179, 157, 219, 1) 0%, rgba(103, 58, 183, 1) 100%);
`;

const LoadingText = styled.div`
  color: white;
  font-size: 1.5rem;
  margin-top: 20px;
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <div>
        <Spinner />
        <LoadingText>Cargando...</LoadingText>
      </div>
    </LoadingContainer>
  );
};

export default LoadingScreen;
