import { createRoot } from 'react-dom/client';
import Aurora from './components/Aurora';
import '../js/motion.js';

createRoot(document.getElementById('aurora-root')).render(
  <Aurora
    colorStops={['#bcafed', '#fce4ef', '#d2dcf0']}
    amplitude={1}
    blend={0.5}
    height={0.45}
    speed={1.4}
    glow={0.6}
  />
);
