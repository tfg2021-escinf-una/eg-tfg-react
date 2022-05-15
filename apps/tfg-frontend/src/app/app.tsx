import React from 'react'
import { ApplicationRouter } from './routes';
import { TfgThemeProvider } from '@eg-tfg/core';
import { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`
  body {
    margin: 0px;
    min-height: 100vh;
    overflow-x: hidden;
  }
`

export function App() {
  return (
    <React.StrictMode>
      <TfgThemeProvider mode={'dark'} >
        <GlobalStyles />
        <ApplicationRouter />
      </TfgThemeProvider>
    </React.StrictMode>
  );
}

export default App;
