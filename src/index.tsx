import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// I'm creating the root element for our React application
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// I'm rendering the App component with React.StrictMode for better development experience
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// I'm measuring performance using web-vitals
reportWebVitals(); 