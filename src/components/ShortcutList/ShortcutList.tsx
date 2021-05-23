import classnames from 'classnames';
import React from 'react';

import { Emoji } from '../../constants';
import { formatShortcut } from '../../util';
import { Shortcut } from '../../models';

import * as styles from './ShortcutList.css';

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
            <span className={styles.shortcut}>{formatShortcut(shortcut)}</span>
          </li>
        );
      })}
    </ul>
  );
};
