import { useCallback, useEffect, useState } from 'react';
import { storage, type Storage } from 'webextension-polyfill';

import { BrowserStorageKey, StorageAreaName } from '@models/storage.js';

export type StorageHook<T> = {
  error?: Error;
  value?: T;
  loading: boolean;
  set: (value: T) => Promise<void>;
  remove: () => Promise<void>;
};

export const useBrowserStorage = <T = unknown>(
  key: BrowserStorageKey,
  storageArea: StorageAreaName = StorageAreaName.Local,
): StorageHook<T> => {
  const [value, setValue] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  const set = useCallback((value: T) => storage[storageArea].set({ [key]: value }), [key, storageArea]);

  const remove = useCallback(() => storage[storageArea].remove(key), [key, storageArea]);

  useEffect(() => {
    setLoading(true);

    storage[storageArea]
      .get(key)
      .then(
        ({ [key]: data }) => {
          console.groupCollapsed(`[useStorage hook] Getting ${key} from browser.storage.${storageArea}`);
          console.info(data);
          console.groupEnd();

          setValue(data);
        },
        error => {
          console.groupCollapsed(`[useStorage hook] Error getting ${key} from browser.storage.${storageArea}`);
          console.error(error);
          console.groupEnd();

          setError(error);
        },
      )
      .finally(() => setLoading(false));
  }, [key, storageArea]);

  useEffect(() => {
    const onChanged = (changes: Record<string, Storage.StorageChange>, areaName: string): void => {
      if (areaName === storageArea && Object.hasOwn(changes, key)) {
        console.info(`[useStorage hook] ${key} changed in browser.storage.${storageArea}`);

        setValue(changes[key].newValue);
      }
    };

    storage.onChanged.addListener(onChanged);

    return () => {
      storage.onChanged.removeListener(onChanged);
    };
  }, [key, storageArea]);

  return { error, value, loading, set, remove };
};
