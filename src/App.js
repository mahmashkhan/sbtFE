import { useRoutes } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense } from 'react';
import ScrollToTop from './User/components/ScrollToTop';

import AdminRoutes from "../src/routes/AdminRoutes";
import UserRoutes from "../src/routes/UserRoutes";

function App() {
  const darkBlueTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#000000',
        paper: '#1a2525',
        header: 'rgba(95, 93, 93, 0.9)'
      },
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#90caf9',
      },
      text: {
        primary: '#ffffff',
        secondary: '#b0bec5',
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  });

  const routes = [...AdminRoutes, ...UserRoutes];
  const routing = useRoutes(routes);

  return (
    <Suspense fallback={<div style={{ color: 'white', padding: '20px' }}>Loading...</div>}>
      <ScrollToTop />
      <ThemeProvider theme={darkBlueTheme}>
        <CssBaseline />
        
        {routing}
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
