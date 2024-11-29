import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { AuthProvider, AuthContext } from './Context/AuthContext';
import Login from './Components/Login/Login';
import Nav from './Components/Nav/Nav';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'FontePrincipal'; 
    src: url('./fonts/Ubuntu-Light.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'FontePrincipal', sans-serif; 
    margin: 0; 
    padding: 0; 
    background: linear-gradient(-45deg, #000000, #0B192C);
  }
`;

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <AppContent>
        <Main />
      </AppContent>
    </AuthProvider>
  );
}

function Main() {
  const { authState } = React.useContext(AuthContext);

  return authState.isAuthenticated ? <Nav /> : <Login />;
}

const AppContent = styled.div`
  width: 100%;
  text-align: center;
  overflow-y: auto;
  min-height: 100vh;
`;

export default App;