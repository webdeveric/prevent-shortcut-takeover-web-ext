export type LazyDebugFn = () => Parameters<typeof console.debug>;

export function debug(lazyFn: LazyDebugFn): void;

export function debug(...args: Parameters<typeof console.debug>): void;

export function debug(...args: Parameters<typeof console.debug> | [LazyDebugFn]): void {
  if (process.env['NODE_ENV'] === 'development') {
    const prefix = '[Prevent Shortcut Takeover]';

    if (typeof args[0] === 'function') {
      console.debug(prefix, ...args[0]());
    } else {
      console.debug(prefix, ...args);
    }
  }
}
