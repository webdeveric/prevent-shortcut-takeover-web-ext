import { assertIsString } from '@webdeveric/utils/assertion/assertIsString';
import { assertPredicate } from '@webdeveric/utils/assertion/assertPredicate';
import { useActionState, useState, type ReactElement } from 'react';

import { Input } from '@components/Input.js';
import { ShortcutInput } from '@components/ShortcutInput.js';
import { SubmitButton } from '@components/SubmitButton.js';
import { addShortcut } from '@utils/addShortcut.js';
import { isValidSelector } from '@utils/isValidSelector.js';
import { parseShortcut } from '@utils/parseShortcut.js';
import { assertIsShortcut } from '@utils/type-assertion.js';
import { isShortcut } from '@utils/type-predicate.js';

const saveShortcutAction = async (_state: string, formData: FormData): Promise<string> => {
  try {
    const shortcutInput = formData.get('shortcut');

    assertIsString(shortcutInput, 'Shortcut must be a string');

    const cssSelector = formData.get('cssSelector');

    if (cssSelector) {
      assertPredicate(cssSelector, isValidSelector, 'Invalid CSS selector');
    }

    const shortcut = parseShortcut(shortcutInput);

    assertIsShortcut(shortcut, 'Invalid shortcut');

    // Don't store empty CSS selector.
    shortcut.selector = cssSelector?.trim() || undefined;

    await addShortcut(shortcut);
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }

  return '';
};

export const AddShortcutForm = (): ReactElement => {
  const [submissionCounter, setSubmissionCounter] = useState(0);

  const [errorMessage, addShortcutAction] = useActionState(
    async (state: string, formData: FormData): Promise<string> => {
      const errors = await saveShortcutAction(state, formData);

      if (errors.length === 0) {
        setSubmissionCounter((prev) => prev + 1);
      }

      return errors;
    },
    '',
  );

  return (
    <form action={addShortcutAction} className="form" key={submissionCounter}>
      <div className="inputItems">
        <div>
          <label className="label" htmlFor="shortcut-input">
            Keyboard shortcut{' '}
            <span aria-hidden="true" className="required-indicator">
              *
            </span>
          </label>
          <ShortcutInput
            name="shortcut"
            id="shortcut-input"
            className="input"
            autoFocus
            tabIndex={1}
            autoComplete="off"
            spellCheck="false"
            placeholder="Ctrl + k"
            validator={(value) => {
              assertPredicate(
                parseShortcut(value),
                isShortcut,
                value ? 'Invalid keyboard shortcut' : 'Keyboard shortcut is required',
              );
            }}
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="css-selector-input">
            CSS selector (
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read documentation
            </a>
            )
          </label>
          <Input
            name="cssSelector"
            id="css-selector-input"
            className="input"
            tabIndex={2}
            type="text"
            validator={(value) => (value === '' || isValidSelector(value) ? undefined : 'Invalid CSS selector')}
            placeholder="#id"
          />
        </div>
      </div>

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}

      <SubmitButton className="submitButton" tabIndex={3}>
        Add shortcut
      </SubmitButton>
    </form>
  );
};
