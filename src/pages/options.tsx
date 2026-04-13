import { createRoot } from 'react-dom/client';

import { Bootstrap } from '@components/Bootstrap.js';
import { OptionsPage } from '@components/OptionsPage/OptionsPage.jsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <Bootstrap>
    <OptionsPage />
  </Bootstrap>,
);
