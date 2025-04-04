import { useCallback, useState, type ChangeEvent, type FormEvent, type ReactElement } from 'react';

import { Bootstrap } from '@components/Bootstrap.jsx';
import { ShortcutInput } from '@components/ShortcutInput.jsx';
import { ShortcutList } from '@components/ShortcutList/ShortcutList.jsx';
import { useBrowserStorage } from '@hooks/useBrowserStorage.js';
import { BrowserStorageKey, StorageAreaName } from '@models/storage.js';
import { formatShortcut } from '@utils/formatShortcut.js';
import { getUniqueShortcuts } from '@utils/getUniqueShortcuts.js';
import { isValidSelector } from '@utils/isValidSelector.js';
import { shortcutsEqual } from '@utils/shortcutsEqual.js';
import { assertIsShortcutArray } from '@utils/type-assertion.js';
import type { Shortcut } from '@models/shortcut.js';

import * as styles from './OptionsPage.css';

export const OptionsPage = (): ReactElement => {
  const { value, loading, error, set } = useBrowserStorage<Shortcut[]>(
    BrowserStorageKey.Shortcuts,
    StorageAreaName.Local,
    assertIsShortcutArray,
  );
  const [newShortcut, setNewShortcut] = useState<Shortcut>();
  const [newSelector, setNewSelector] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const addShortcut = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      if (newShortcut) {
        if (isValidSelector(newSelector)) {
          newShortcut.selector = newSelector;

          set(getUniqueShortcuts([...(value ?? []), newShortcut]))
            .then((): void => {
              setNewShortcut(undefined);
              setErrorMessage(undefined);
            })
            .catch((storageError): void => {
              setErrorMessage(String(storageError));
            });
        } else {
          setErrorMessage('CSS selector is invalid');
        }
      }
    },
    [newShortcut, newSelector, set, value],
  );

  const onSelectorChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewSelector(event.target.value);
    setErrorMessage(undefined);
  }, []);

  const removeShortcut = useCallback(
    (shortcut: Shortcut): void => {
      const shortcuts = (value ?? []).filter((item) => !shortcutsEqual(item, shortcut));

      set(shortcuts).catch(console.error);
    },
    [set, value],
  );

  return (
    <Bootstrap>
      <p>The shortcuts listed below will not be allowed to be taken over by websites.</p>

      <h2>Shortcuts</h2>

      {error && <p className={styles.errorMessage}>{error.message}</p>}

      {!loading && value && (
        <ShortcutList className={styles.shortcutList} shortcuts={value} removeShortcut={removeShortcut} />
      )}

      <details className={styles.details}>
        <summary>
          <h2>Add shortcut</h2>
        </summary>

        <p>
          <strong>Keyboard shortcut:</strong> Click in the box then perform a shortcut, such as{' '}
          <strong>ctrl + k</strong>.
        </p>

        <p>
          <strong>CSS Selector:</strong> If the <code>event.target</code> matches the selector, the shortcut will not be
          allowed to be taken over. This can be useful if you don&apos;t want to prevent a shortcut for the entire{' '}
          <code>document</code>.{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors">
            Read the CSS selector documentation
          </a>
          .
        </p>
      </details>

      <form onSubmit={addShortcut} className={styles.form}>
        <div className={styles.inputItems}>
          <div>
            <label className={styles.label} htmlFor="shortcut-input">
              Keyboard shortcut
            </label>
            <ShortcutInput
              className={styles.input}
              id="shortcut-input"
              tabIndex={1}
              setShortcut={setNewShortcut}
              value={formatShortcut(newShortcut)}
            />
          </div>

          <div>
            <label className={styles.label} htmlFor="css-selector-input">
              CSS selector (optional)
            </label>
            <input
              id="css-selector-input"
              className={styles.input}
              tabIndex={2}
              type="text"
              onChange={onSelectorChange}
            />
          </div>
        </div>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <button type="submit" className={styles.submitButton} tabIndex={3} disabled={!newShortcut || !!errorMessage}>
          Add shortcut
        </button>
      </form>
    </Bootstrap>
  );
};
