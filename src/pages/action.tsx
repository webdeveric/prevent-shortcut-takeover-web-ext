import { createRoot } from 'react-dom/client';

import { ActionPage } from '@components/ActionPage/ActionPage.jsx';
import { Bootstrap } from '@components/Bootstrap.js';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <Bootstrap>
    <ActionPage />
  </Bootstrap>,
);
