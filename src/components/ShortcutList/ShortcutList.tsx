import React, { VoidFunctionComponent } from 'react';
import classnames from 'classnames';

import { capitalize, formatShortcut } from '../../util';
import { Emoji } from '../../constants';
import { Shortcut } from '../../models';

import * as styles from './ShortcutList.css';

const Shortcut: VoidFunctionComponent<{ className?: string; shortcut: Shortcut }> = ({
  className,
  shortcut,
}): JSX.Element => {
  const { key, selector, ...modifiers } = shortcut;

  const mods = Object.entries(modifiers)
    .filter(([, value]) => value)
    .map(([key]) => <kbd key={key}>{capitalize(key.replace(/Key$/, ''))}</kbd>);

  return (
    <span className={className}>
      {mods}
      <kbd>{key}</kbd>
      {selector && <code className={styles.selector}>{selector}</code>}
    </span>
  );
};

export const ShortcutList = ({
  className,
  shortcuts,
  removeShortcut,
}: {
  className?: string;
  shortcuts: Shortcut[];
  removeShortcut: (shortcut: Shortcut) => void;
}): JSX.Element => {
  return (
    <ul className={classnames(className, styles.shortcutList, 'browser-style')}>
      {shortcuts.map(shortcut => {
        const output = formatShortcut(shortcut);

        return (
          <li key={output} className={styles.item}>
            <div className={styles.actions}>
              <button onClick={() => removeShortcut(shortcut)} className={styles.button}>
                {Emoji.RedX}
              </button>
            </div>
            <Shortcut className={styles.shortcut} shortcut={shortcut} />
          </li>
        );
      })}
    </ul>
  );
};
