import { byLocaleCompare } from '@webdeveric/utils/sort/byLocaleCompare';
import { useMemo, type FunctionComponent } from 'react';

import { useBrowserTheme } from '@hooks/useBrowserTheme.js';
import { debug } from '@utils/logging.js';

export const BrowserColorPalette: FunctionComponent = () => {
  const theme = useBrowserTheme();

  const varNames = useMemo(() => {
    debug({ theme });

    return Object.values(getComputedStyle(document.documentElement))
      .filter((item) => item.startsWith('--browser'))
      .sort(byLocaleCompare);
  }, [theme]);

  return (
    <div className="grid grid-cols-4 gap-1">
      {varNames.map((name) => (
        <div
          key={name}
          title={name}
          className="aspect-square cursor-pointer overflow-hidden border p-1"
          style={{
            background: `var(${name})`,
            textShadow: '0 0 3px #000',
            WebkitTextStroke: '1px #FFF',
          }}
          onClick={() => {
            navigator.clipboard.writeText(name).catch(console.error);
          }}
        >
          {name}
        </div>
      ))}
    </div>
  );
};
