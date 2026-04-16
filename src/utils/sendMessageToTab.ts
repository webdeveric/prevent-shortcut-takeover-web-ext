import { tabs, type Tabs } from 'webextension-polyfill';

import type { ExtensionMessage } from '@src/types.js';

export const sendMessageToTab = <Message extends ExtensionMessage, Response = unknown>(
  tabId: number,
  message: Message,
  options?: Tabs.SendMessageOptionsType,
): Promise<Response> => {
  return tabs.sendMessage(tabId, message, options);
};
