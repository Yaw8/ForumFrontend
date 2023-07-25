import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GetApp } from './context/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GetApp>
    <App />
    </GetApp>
  </React.StrictMode>
);

