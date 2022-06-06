import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import AskMeProvider from './Context/AskMeProvider'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <AskMeProvider >

  <ChakraProvider>

    <App />

  </ChakraProvider>
        </AskMeProvider>

);

