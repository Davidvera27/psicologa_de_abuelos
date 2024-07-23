import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Pacientes from './pages/Pacientes';
import AddPaciente from './pages/addPaciente';
import PacienteDetalle from './pages/PacienteDetalle';
import Conductor from './pages/conductor';
import Cronograma from './pages/cronograma';
import Evaluacion from './pages/Evaluacion';
import Administrativo from './pages/Administrativo';
import Historico from './pages/Historico';
import Contrato1 from './components/Contrato1';
import Contrato2 from './components/Contrato2'; // Importa el componente Contrato2
import styled, { createGlobalStyle, ThemeProvider, keyframes } from 'styled-components';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import Breadcrumbs from './components/Breadcrumbs';
import backgroundImage from './assets/lofo_psico_abuelos_full_hd.jpeg';
import NavBar from './components/NavBar';
import Login from './pages/login';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WorkIcon from '@mui/icons-material/Work';
import AssessmentIcon from '@mui/icons-material/Assessment';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background: url(${backgroundImage}) no-repeat center center fixed;
    background-size: cover;
  }
`;

const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.85);
  min-height: calc(100vh - 64px);
  padding: 2rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }
`;

const CenterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 60%;
  margin: 0 auto;
  padding-top: 2rem;
`;

const CenterButton = styled(Link)`
  color: ${props => props.theme.palette.text.secondary};
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-radius: 10px;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  background: linear-gradient(145deg, rgba(179, 157, 219, 1) 0%, rgba(103, 58, 183, 1) 100%);
  border: 1px solid ${props => props.theme?.palette?.primary?.dark || '#673ab7'};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  animation: ${glow} 2s infinite alternate;
  &:hover {
    background: linear-gradient(145deg, rgba(103, 58, 183, 1) 0%, rgba(179, 157, 219, 1) 100%);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
    svg {
      color: ${props => props.theme?.palette?.text?.primary || '#fff'};
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      border-radius: 50px;
    }
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  transition: color 0.3s ease, box-shadow 0.3s ease;
  svg {
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
  }
`;

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
  border: 8px solid ${props => props.theme?.palette?.primary?.light || '#b39ddb'};
  border-top: 8px solid ${props => props.theme?.palette?.primary?.main || '#673ab7'};
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

const AuthenticatedApp = () => (
  <Router>
    <NavBar />
    <ContentWrapper>
      <Breadcrumbs />
      <Routes>
        <Route 
          path="/" 
          element={
            <CenterWrapper>
              <CenterButton to="/pacientes">
                <IconWrapper>
                  <PeopleIcon fontSize="large" />
                </IconWrapper>
                Pacientes
              </CenterButton>
              <CenterButton to="/add-paciente">
                <IconWrapper>
                  <AddCircleIcon fontSize="large" />
                </IconWrapper>
                Agregar
              </CenterButton>
              <CenterButton to="/conductor">
                <IconWrapper>
                  <DirectionsBusIcon fontSize="large" />
                </IconWrapper>
                Transporte
              </CenterButton>
              <CenterButton to="/cronograma">
                <IconWrapper>
                  <ScheduleIcon fontSize="large" />
                </IconWrapper>
                Cronograma
              </CenterButton>
              <CenterButton to="/Evaluacion">
                <IconWrapper>
                  <AssessmentIcon fontSize="large" />
                </IconWrapper>
                Evaluación
              </CenterButton>
              <CenterButton to="/Administrativo">
                <IconWrapper>
                  <WorkIcon fontSize="large" />
                </IconWrapper>
                Administrativo
              </CenterButton>
            </CenterWrapper>
          } 
        />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/add-paciente" element={<AddPaciente />} />
        <Route path="/paciente/:id" element={<PacienteDetalle />} />
        <Route path="/conductor" element={<Conductor />} />
        <Route path="/cronograma" element={<Cronograma />} />
        <Route path="/Evaluacion" element={<Evaluacion />} />
        <Route path="/Administrativo" element={<Administrativo />} />
        <Route path="/historico" element={<Historico />} /> {/* Nueva ruta */}
        <Route path="/contrato1" element={<Contrato1 />} /> {/* Nueva ruta para Contrato1 */}
        <Route path="/contrato2" element={<Contrato2 />} /> {/* Nueva ruta para Contrato2 */}
      </Routes>
    </ContentWrapper>
  </Router>
);

const App = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (isLoading) return (
    <LoadingContainer>
      <div>
        <Spinner />
        <LoadingText>Cargando...</LoadingText>
      </div>
    </LoadingContainer>
  );
  if (error) return <div>Oops... {error.message}</div>;
  if (!isAuthenticated) return <Login />;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CssBaseline />
      <AuthenticatedApp />
    </ThemeProvider>
  );
}

export default App;
