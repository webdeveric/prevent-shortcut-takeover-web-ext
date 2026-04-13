import { BrowserColorPalette } from '@components/BrowserColorPalette.js';
import { AddShortcutForm } from '@components/OptionsPage/AddShortcutForm.js';
import { ShortcutList } from '@components/ShortcutList/ShortcutList.js';

import './OptionsPage.css';

import type { ReactElement } from 'react';

export const OptionsPage = (): ReactElement => {
  return (
    <>
      <p>The shortcuts listed below will not be allowed to be taken over by websites.</p>

      <h2>Shortcuts</h2>

      <ShortcutList className="shortcutList" />

      <AddShortcutForm />

      {process.env['NODE_ENV'] === 'development' && (
        <footer className="border-browser-popup-border popup-footer mt-4 flex flex-row flex-nowrap content-center items-center justify-center gap-3 rounded-sm border p-3">
          <a href={window.location.href} target="_blank" rel="noreferrer" title="Open action popup URL in a new tab">
            This page
          </a>

          <a href={window.location.href} target="_blank" rel="noreferrer" title="Open action popup URL in a new tab">
            This page
          </a>

          <a
            className="cursor-pointer"
            title="Click to throw an error for testing the error boundary"
            onClick={() => {
              throw new Error('Testing');
            }}
          >
            Throw <code>Error()</code>
          </a>

          <BrowserColorPalette />
        </footer>
      )}
    </>
  );
};
