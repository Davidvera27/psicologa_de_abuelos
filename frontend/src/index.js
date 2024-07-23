// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authConfig from './auth_config.json';
import theme from './theme';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Auth0Provider
    domain={authConfig.domain}
    clientId={authConfig.clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Auth0Provider>
);

reportWebVitals();
