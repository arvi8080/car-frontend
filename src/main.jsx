import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { MotionConfig } from 'motion/react';

createRoot(document.getElementById('root')).render(
  <MotionConfig viewport={{ once: true }}>
    <App />
  </MotionConfig>
);
