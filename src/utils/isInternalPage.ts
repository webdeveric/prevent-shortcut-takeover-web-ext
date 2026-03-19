const internalProtocols = ['chrome:', 'chrome-extension:', 'about:', 'edge:', 'moz-extension:', 'devtools:'];

export function isInternalPage(input: URL | string | null | undefined): boolean {
  if (!input) {
    return true;
  }

  const url = input instanceof URL ? input : new URL(input);

  return internalProtocols.some((protocol) => protocol === url.protocol);
}
