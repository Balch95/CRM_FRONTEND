import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App'
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs">
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);

reportWebVitals();
