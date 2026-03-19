import { useActiveTab } from '@hooks/useActiveTab.js';

import type { FunctionComponent } from 'react';

export const TabFavicon: FunctionComponent = () => {
  const tab = useActiveTab();

  if (!tab?.favIconUrl) {
    return <div className="size-4 rounded-sm bg-gray-200" />;
  }

  return (
    <img
      src={tab.favIconUrl}
      alt={tab.url ? `Icon for ${tab.url.host}` : ''}
      title={tab.title ?? ''}
      className="size-4 rounded-sm select-none"
    />
  );
};
