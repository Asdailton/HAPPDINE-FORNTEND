// Em main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa o componente App
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Cria o root do React e renderiza o componente App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
