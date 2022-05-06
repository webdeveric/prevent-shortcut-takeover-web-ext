import React from 'react';

import { createRoot } from 'react-dom/client';

import { OptionsPage } from '../components/OptionsPage';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<OptionsPage />);
