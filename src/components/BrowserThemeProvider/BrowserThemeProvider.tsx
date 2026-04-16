import { useEffect, useState, type FunctionComponent, type PropsWithChildren } from 'react';
import { theme, type Theme } from 'webextension-polyfill';

import { BrowserThemeContext, type BrowserThemeContextValue } from '@context/BrowserThemeContext.js';
import { applyThemeToCSSVars } from '@utils/applyThemeToCSSVars.js';
import { isThemeColors } from '@utils/isThemeColors.js';
import { debug } from '@utils/logging.js';

/**
 * Firefox is the only browser that supports this at the moment.
 *
 * All other browsers will get the default value.
 *
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/theme/getCurrent
 */
export const BrowserThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [value, setBrowserTheme] = useState<BrowserThemeContextValue>({
    colors: null,
  });

  useEffect(() => {
    if (theme) {
      theme
        .getCurrent()
        .then((currentTheme) => {
          setBrowserTheme({
            colors: currentTheme.colors ?? null,
          });

          applyThemeToCSSVars(currentTheme.colors);
        })
        .catch((error) => debug('Error occurred while getting current theme', error));

      const listener = (updateInfo: Theme.ThemeUpdateInfo): void => {
        const { colors } = updateInfo.theme;

        setBrowserTheme({
          colors: colors ?? null,
        });

        if (colors === null || isThemeColors(colors)) {
          applyThemeToCSSVars(colors);
        }
      };

      theme.onUpdated.addListener(listener);

      return () => theme.onUpdated.removeListener(listener);
    }
  }, []);

  return <BrowserThemeContext value={value}>{children}</BrowserThemeContext>;
};
