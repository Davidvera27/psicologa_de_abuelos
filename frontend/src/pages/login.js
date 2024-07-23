// src/pages/Login.js

import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, white, #e0bbff);
  text-align: center;
  color: #333;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #6a1b9a;
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #4a148c;
`;

const StyledButton = styled(Button)`
  && {
    background-color: #8e24aa;
    color: white;
    font-size: 1.25rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #6a1b9a;
    }
  }
`;

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <LoginWrapper>
      <Title>Psicóloga de Abuelos</Title>
      <Description>Bienvenido a la plataforma de gestión y cuidado de adultos mayores. Por favor, inicie sesión para continuar.</Description>
      <StyledButton onClick={() => loginWithRedirect()} variant="contained">
        Iniciar Sesión
      </StyledButton>
    </LoginWrapper>
  );
};

export default Login;
