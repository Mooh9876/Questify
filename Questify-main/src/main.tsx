// Das ist die Startdatei der App – sie wird als allererstes geladen.
// Sie verbindet die App mit der HTML-Seite und startet React.
// Hier muss man normalerweise nichts ändern.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);