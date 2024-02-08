export const isValidSelector = (selector?: string): boolean => {
  if (!selector) {
    return true;
  }

  try {
    document.querySelector(selector);

    return true;
  } catch {
    return false;
  }
};
