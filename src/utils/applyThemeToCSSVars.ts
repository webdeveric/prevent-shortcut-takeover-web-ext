import { isRgbaTuple, isRgbTuple } from '@utils/isRgbTuple.js';
import type { ThemeColor, ThemeColors } from '@src/types.js';

export function themeColorToCssValue(color: ThemeColor | null | undefined): string | undefined {
  if (!color) {
    return;
  }

  if (isRgbTuple(color)) {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  }

  if (isRgbaTuple(color)) {
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`;
  }

  return color;
}

export const applyStyleProperty = (property: string, themeColor: ThemeColor | null | undefined): void => {
  const value = themeColorToCssValue(themeColor);

  if (value) {
    document.documentElement.style.setProperty(property, value);
  } else {
    document.documentElement.style.removeProperty(property);
  }
};

export function applyThemeToCSSVars(themeColors: ThemeColors | null | undefined): void {
  applyStyleProperty('--firefox-toolbar-bg', themeColors?.toolbar);
  applyStyleProperty('--firefox-toolbar-text', themeColors?.toolbar_text ?? themeColors?.tab_text);
  applyStyleProperty('--firefox-accent', themeColors?.button_background_active);
  applyStyleProperty('--firefox-popup-bg', themeColors?.popup);
  applyStyleProperty('--firefox-popup-text', themeColors?.popup_text);
  applyStyleProperty('--firefox-frame', themeColors?.frame);
}
