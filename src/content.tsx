import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

// We need to create a new div to mount our React app to
const container = document.createElement('div');
container.id = 'leetcode-extension-container';
document.body.appendChild(container);

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);