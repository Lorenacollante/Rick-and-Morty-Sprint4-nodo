// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CharacterProvider } from "./context/CharacterContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envuelve App con el Provider para que todos los hijos tengan acceso al estado */}
    <CharacterProvider> 
      <App />
    </CharacterProvider>
  </React.StrictMode>
);