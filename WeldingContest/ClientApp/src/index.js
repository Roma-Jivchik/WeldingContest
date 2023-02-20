import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createRoot} from 'react-dom/client'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);

registerServiceWorker();

