import { capitalize } from '@webdeveric/utils/capitalize';
import { useCallback, type FunctionComponent, type ReactElement } from 'react';

import { useBrowserStorage } from '@hooks/useBrowserStorage.js';
import { BrowserStorageKey, StorageAreaName } from '@models/storage.js';
import { formatShortcut } from '@utils/formatShortcut.js';
import { shortcutsEqual } from '@utils/shortcutsEqual.js';
import { assertIsShortcutArray } from '@utils/type-assertion.js';
import { isFunctionKey } from '@utils/type-predicate.js';
import type { Shortcut } from '@models/shortcut.js';

import './ShortcutList.css';

const Shortcut: FunctionComponent<{ className?: string; shortcut: Shortcut }> = ({
  className,
  shortcut,
}): ReactElement => {
  const { key, selector, ...modifiers } = shortcut;

  const mods = Object.entries(modifiers)
    .filter(([, value]) => value)
    .map(([modifierKey]) => <kbd key={modifierKey}>{capitalize(modifierKey.replace(/Key$/, ''))}</kbd>);

  return (
    <span className={className}>
      {mods}
      {/* Function keys are stored lowercased but should display as e.g. "F1" */}
      <kbd>{key === ' ' ? 'space' : isFunctionKey(key) ? key.toUpperCase() : key}</kbd>
      {selector && <code className="selector">{selector}</code>}
    </span>
  );
};

// No shortcuts defined by default
const defaultShortcuts: Shortcut[] = [];

export const ShortcutList: FunctionComponent<{ className?: string }> = ({ className }) => {
  const {
    value: shortcuts,
    error,
    set,
  } = useBrowserStorage<Shortcut[]>(
    BrowserStorageKey.Shortcuts,
    StorageAreaName.Local,
    defaultShortcuts,
    assertIsShortcutArray,
  );

  const removeShortcut = useCallback(
    (shortcut: Shortcut): void => {
      set(shortcuts.filter((item) => !shortcutsEqual(item, shortcut))).catch(console.error);
    },
    [set, shortcuts],
  );

  if (error) {
    return <p className="errorMessage">{error.message}</p>;
  }

  return (
    <ul className={className}>
      {shortcuts.map((shortcut) => {
        const output = formatShortcut(shortcut);

        return (
          <li key={output} className="item">
            <div className="actions">
              <button onClick={() => removeShortcut(shortcut)} className="button" title="delete shortcut">
                ❌
              </button>
            </div>
            <Shortcut className="shortcut" shortcut={shortcut} />
          </li>
        );
      })}
    </ul>
  );
};
