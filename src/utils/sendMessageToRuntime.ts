import { runtime } from 'webextension-polyfill';

import type { ExtensionMessage } from '@src/types.js';

export const sendMessageToRuntime = <Message extends ExtensionMessage, Response = unknown>(
  message: Message,
): Promise<Response> => runtime.sendMessage<ExtensionMessage, Response>(message);
