import React from 'react';
import { createRoot } from 'react-dom/client';

import { OptionsPage } from '@components/OptionsPage/OptionsPage.jsx';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<OptionsPage />);
