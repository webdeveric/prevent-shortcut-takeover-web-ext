export const metaKeyPattern = /^(Alt|Control|Meta|Shift)(Left|Right)?$/;

// Matches F1-F12 (case-insensitive because keys are stored lowercased via getShortcutFromEvent,
// but arrive uppercase from KeyboardEvent.key in the browser).
export const functionKeyPattern = /^F([1-9]|1[0-2])$/i;

export const isFunctionKey = (key: string): boolean => functionKeyPattern.test(key);
