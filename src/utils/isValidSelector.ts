export const isValidSelector = (selector?: unknown): selector is string => {
  if (typeof selector !== 'string') {
    return false;
  }

  if (!selector) {
    return false;
  }

  try {
    document.querySelector(selector);

    return true;
  } catch {
    return false;
  }
};
