import { isRgbaTuple, isRgbTuple } from '@utils/isRgbTuple.js';
import { debug } from '@utils/logging.js';
import type { ThemeColor, ThemeColorProperties, ThemeColors } from '@src/types.js';

import type { KeyValueTuple } from '@webdeveric/utils/types';

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

function getThemeColorsKeys(themeColors?: ThemeColors | null): ThemeColorProperties[] {
  const existingKeys = themeColors ? Object.keys(themeColors) : [];

  return [
    ...(existingKeys as ThemeColorProperties[]),
    'accentcolor',
    'bookmark_text',
    'button_background_active',
    'button_background_hover',
    'focus_outline',
    'frame_inactive',
    'frame',
    'icons_attention',
    'icons',
    'ntp_background',
    'ntp_card_background',
    'ntp_text',
    'popup_border',
    'popup_highlight_text',
    'popup_highlight',
    'popup_text',
    'popup',
    'sidebar_border',
    'sidebar_highlight_text',
    'sidebar_highlight',
    'sidebar_text',
    'sidebar',
    'tab_background_separator',
    'tab_background_text',
    'tab_line',
    'tab_loading',
    'tab_selected',
    'tab_text',
    'textcolor',
    'toolbar_bottom_separator',
    'toolbar_field_border_focus',
    'toolbar_field_border',
    'toolbar_field_focus',
    'toolbar_field_highlight_text',
    'toolbar_field_highlight',
    'toolbar_field_separator',
    'toolbar_field_text_focus',
    'toolbar_field_text',
    'toolbar_field',
    'toolbar_text',
    'toolbar_top_separator',
    'toolbar_vertical_separator',
    'toolbar',
  ];
}

export function applyThemeToCSSVars(themeColors: ThemeColors | null | undefined): void {
  const entries = getThemeColorsKeys(themeColors).map(
    (key): KeyValueTuple<ThemeColorProperties, ThemeColor | null> => [key, themeColors?.[key] ?? null],
  );

  for (const [key, value] of entries) {
    applyStyleProperty(`--browser-${key.replaceAll('_', '-')}`, value);
  }

  debug(() => ['Theme colors', Object.fromEntries(entries)]);
}
