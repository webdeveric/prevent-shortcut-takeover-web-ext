import { assertIsStringArray } from '@webdeveric/utils/assertion/assertIsStringArray';
import { byLocaleCompare } from '@webdeveric/utils/sort/byLocaleCompare';
import { uniqueItems } from '@webdeveric/utils/uniqueItems';
import { useCallback, type FunctionComponent } from 'react';
import { runtime } from 'webextension-polyfill';

import { TabFavicon } from '@components/TabFavicon/TabFavicon.js';
import { useActiveTab } from '@hooks/useActiveTab.js';
import { useBrowserStorage } from '@hooks/useBrowserStorage.js';
import { BrowserStorageKey, StorageAreaName } from '@models/storage.js';

import './ActionPage.css';

// No disabled hosts defined by default
const defaultDisabledHosts: string[] = [];

const ExternalPageOptions: FunctionComponent = () => {
  const tab = useActiveTab();

  const { value: disabledHosts, set } = useBrowserStorage<string[]>(
    BrowserStorageKey.DisabledHosts,
    StorageAreaName.Local,
    defaultDisabledHosts,
    assertIsStringArray,
  );

  const toggleHostEnabled = useCallback((): void => {
    const host = tab.url?.host;

    if (host) {
      set(
        uniqueItems(
          disabledHosts.includes(host)
            ? disabledHosts.filter((disabledHost) => disabledHost !== host)
            : [...disabledHosts, host],
        ).sort(byLocaleCompare),
      ).catch(console.error);
    }
  }, [disabledHosts, set, tab.url]);

  if (!tab.url) {
    return (
      <section>
        <p>
          Unable to determine <code>host</code>.
        </p>
      </section>
    );
  }

  const hostIsDisabled = disabledHosts.includes(tab.url.host);

  return (
    <section>
      <button
        title={hostIsDisabled ? 'Enable for this host' : 'Disable for this host'}
        type="button"
        className="flex w-full cursor-pointer flex-row flex-nowrap content-center items-center justify-center gap-2 py-2"
        onClick={toggleHostEnabled}
      >
        <TabFavicon />
        <div className="font-medium">{tab.url.host}</div>
        <div className="font-black">{hostIsDisabled ? 'Disabled' : 'Enabled'}</div>
      </button>
    </section>
  );
};

const InternalPageOptions: FunctionComponent = () => {
  return (
    <section>
      <p className="text-balance">Shortcuts cannot be customized for an internal page.</p>
    </section>
  );
};

export const ActionPage: FunctionComponent = () => {
  const tab = useActiveTab();

  const manifest = runtime.getManifest();

  return (
    <article className="popup">
      <header className="popup-header flex items-center justify-between gap-2">
        <h1 className="text-md m-0 grow p-0 font-bold select-none">{manifest.name}</h1>
        <button type="button" onClick={() => void runtime.openOptionsPage()}>
          Options
        </button>
      </header>

      <hr className="divider-rainbow my-2" />

      <main className="popup-main">{tab.isInternal ? <InternalPageOptions /> : <ExternalPageOptions />}</main>

      {process.env['NODE_ENV'] === 'development' && (
        <footer className="border-browser-popup-border popup-footer mt-4 flex flex-row flex-nowrap content-center items-center justify-center gap-3 rounded-sm border p-3">
          {manifest.homepage_url && (
            <a title="View source code at GitHub" href={manifest.homepage_url}>
              Source code
            </a>
          )}

          <a href={window.location.href} target="_blank" rel="noreferrer" title="Open action popup URL in a new tab">
            This page
          </a>

          <a
            className="cursor-pointer"
            title="Click to throw an error for testing the error boundary"
            onClick={() => {
              throw new Error('Testing');
            }}
          >
            Throw <code>Error()</code>
          </a>
        </footer>
      )}
    </article>
  );
};
