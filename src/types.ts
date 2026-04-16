import type { Pretty } from '@webdeveric/utils/types/utils';
import type { Manifest } from 'webextension-polyfill';

/**
 * These are the property keys for the `theme.colors` object.
 */
export type ThemeColorProperties = Pretty<
  | keyof Manifest.ThemeTypeColorsType
  | 'accentcolor'
  | 'bookmark_text'
  | 'button_background_active'
  | 'button_background_hover'
  | 'focus_outline'
  | 'frame_inactive'
  | 'frame'
  | 'icons_attention'
  | 'icons'
  | 'ntp_background'
  | 'ntp_card_background'
  | 'ntp_text'
  | 'popup_border'
  | 'popup_highlight_text'
  | 'popup_highlight'
  | 'popup_text'
  | 'popup'
  | 'sidebar_border'
  | 'sidebar_highlight_text'
  | 'sidebar_highlight'
  | 'sidebar_text'
  | 'sidebar'
  | 'tab_background_separator'
  | 'tab_background_text'
  | 'tab_line'
  | 'tab_loading'
  | 'tab_selected'
  | 'tab_text'
  | 'textcolor'
  | 'toolbar_bottom_separator'
  | 'toolbar_field_border_focus'
  | 'toolbar_field_border'
  | 'toolbar_field_focus'
  | 'toolbar_field_highlight_text'
  | 'toolbar_field_highlight'
  | 'toolbar_field_separator'
  | 'toolbar_field_text_focus'
  | 'toolbar_field_text'
  | 'toolbar_field'
  | 'toolbar_text'
  | 'toolbar_top_separator'
  | 'toolbar_vertical_separator'
  | 'toolbar'
>;

export type ThemeColor = Manifest.ThemeColor;

export type ThemeColors = Partial<Record<ThemeColorProperties, ThemeColor | null>>;

export type ActiveTabChanged = {
  type: 'ACTIVE_TAB_CHANGED';
  payload: {
    tabId: number;
    url: string | undefined;
    favIconUrl: string | undefined;
    title: string | undefined;
  };
};

export type ExtensionMessage = ActiveTabChanged;
