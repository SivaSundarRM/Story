import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Dynamically load OpenLayers script
const script = document.createElement('script');
script.src = process.env.REACT_APP_OL_SCRIPT_URL;
script.async = true;
document.body.appendChild(script);

// Render React app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
