import { useCallback, useEffect, useMemo, useState } from 'react';
import { storage, type Storage } from 'webextension-polyfill';

import type { StorageAreaName, BrowserStorageKey } from '@models/storage.js';

import type { TypeAssertionFn } from '@webdeveric/utils/types/functions';

export type StorageHook<T> = {
  error?: Error;
  value: T;
  loading: boolean;
  set: (value: T) => Promise<void>;
  remove: () => Promise<void>;
};

/**
 * @param assertionFn - Should be memoized (useCallback) to prevent unnecessary re-runs
 */
export const useBrowserStorage = <T = unknown>(
  key: BrowserStorageKey,
  storageArea: StorageAreaName,
  defaultValue: T,
  assertionFn: TypeAssertionFn<T>,
): StorageHook<T> => {
  const [value, setValue] = useState<T>(defaultValue);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  // Memoize defaultValue to prevent effect re-runs when parent passes new object references
  const stableDefaultValue = useMemo(() => defaultValue, [defaultValue]);

  const set = useCallback(
    async (newValue: T): Promise<void> => {
      try {
        assertionFn(newValue);
        setError(undefined);

        await storage[storageArea].set({ [key]: newValue });

        setValue(newValue);
      } catch (assertionError) {
        setError(assertionError instanceof Error ? assertionError : new Error(`Invalid ${key} value`));

        throw assertionError;
      }
    },
    [key, storageArea, assertionFn],
  );

  const remove = useCallback(async (): Promise<void> => {
    try {
      await storage[storageArea].remove(key);

      setValue(stableDefaultValue);
      setError(undefined);
    } catch (storageError) {
      setError(storageError instanceof Error ? storageError : new Error(`Failed to remove ${key} from storage`));

      throw storageError;
    }
  }, [key, storageArea, stableDefaultValue]);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    storage[storageArea]
      .get({ [key]: stableDefaultValue })
      .then(
        ({ [key]: data }) => {
          if (cancelled) {
            return;
          }

          console.groupCollapsed(`[useStorage hook] Getting ${key} from browser.storage.${storageArea}`);
          console.info(data);
          console.groupEnd();

          try {
            assertionFn(data);
            setValue(data);
            setError(undefined);
          } catch (assertionError) {
            setError(assertionError instanceof Error ? assertionError : new Error(`Invalid ${key} value`));
          }
        },
        (storageError) => {
          if (cancelled) {
            return;
          }

          console.groupCollapsed(`[useStorage hook] Error getting ${key} from browser.storage.${storageArea}`);
          console.error(storageError);
          console.groupEnd();

          setError(storageError);
        },
      )
      .finally(() => {
        !cancelled && setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [assertionFn, key, storageArea, stableDefaultValue]);

  useEffect(() => {
    const onChanged = (changes: Record<string, Storage.StorageChange>, areaName: string): void => {
      if (areaName === storageArea && Object.hasOwn(changes, key)) {
        console.info(`[useStorage hook] ${key} changed in browser.storage.${storageArea}`);

        const newValue = changes[key]?.newValue;

        // Key has been removed from storage.
        if (newValue === undefined) {
          setValue(stableDefaultValue);
          setError(undefined);

          return;
        }

        // Skip assertion if restoring to default
        if (newValue === stableDefaultValue) {
          setValue(stableDefaultValue);
          setError(undefined);

          return;
        }

        try {
          assertionFn(newValue);
          setValue(newValue);
          setError(undefined);
        } catch (assertionError) {
          setValue(stableDefaultValue);
          setError(assertionError instanceof Error ? assertionError : new Error(`Invalid ${key} value`));
        }
      }
    };

    storage.onChanged.addListener(onChanged);

    return () => {
      storage.onChanged.removeListener(onChanged);
    };
  }, [assertionFn, stableDefaultValue, key, storageArea]);

  return { error, value, loading, set, remove };
};
