// Modified by Impact Engines, 2026-11-19. See NOTICE for attribution and modification scope.
import { createRoot } from 'react-dom/client';
import '@src/ui/index.css';
import '@src/ui/impact-engines.css';
import { watchSystemTheme } from '@src/ui/theme';
import { App } from './App';

const container = document.querySelector('#app-container');
if (!container) throw new Error('Cannot find #app-container');
watchSystemTheme();
createRoot(container).render(<App />);
