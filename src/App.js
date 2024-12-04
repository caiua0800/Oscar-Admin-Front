import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { AuthProvider, AuthContext } from './Context/AuthContext';
import Login from './Components/Login/Login';
import Nav from './Components/Nav/Nav';
import { LoadProvider } from './Context/LoadContext';
import Loading from "./Components/Loading/Loading";

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

  ::-webkit-scrollbar {
    width: 8px; /* Largura da barra de rolagem */
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1); /* Cor do fundo da barra de rolagem */
    border-radius: 10px; /* Borda arredondada do track */
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5); /* Cor do "thumb" da barra de rolagem */
    border-radius: 0px; /* Borda arredondada do thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.8); /* Cor do thumb ao passar o mouse */
  }

  /* Estilização para Firefox */
  scrollbar-width: thin; /* Largura fina */
  scrollbar-color: rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.1);
`;

function App() {
  return (
    <LoadProvider>

      <AuthProvider>
        <GlobalStyle />
        <AppContent>
          <Loading />
          <Main />
        </AppContent>
      </AuthProvider>
    </LoadProvider>

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
  position: relative;
`;

export default App;