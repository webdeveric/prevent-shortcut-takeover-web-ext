import { runtime, type Runtime } from 'webextension-polyfill';

export function onRuntimeMessage<Listener extends Runtime.OnMessageListener>(listener: Listener): () => void {
  runtime.onMessage.addListener(listener);

  return () => runtime.onMessage.removeListener(listener);
}
