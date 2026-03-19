import type { Pretty } from '@webdeveric/utils/types/utils';
import type { Manifest } from 'webextension-polyfill';

export type WithPropertyValue<Input, Value> = {
  [Property in keyof Input]: Input[Property] | Value;
};

export type ThemeColors = Pretty<WithPropertyValue<NonNullable<Manifest.ThemeType['colors']>, null>>;

export type ThemeColor = NonNullable<ThemeColors[keyof ThemeColors]>;

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
