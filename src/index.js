import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App'
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);

reportWebVitals();
