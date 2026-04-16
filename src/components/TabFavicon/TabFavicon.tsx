import { useActiveTab } from '@hooks/useActiveTab.js';

import type { FunctionComponent } from 'react';

export const TabFavicon: FunctionComponent<{ size?: 16 | 24 | 32 }> = ({ size = 16 }) => {
  const tab = useActiveTab();

  const src =
    tab?.favIconUrl ??
    // Blank gif as a placeholder when no favicon is available, to prevent broken image icon
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  return (
    <img width={size} height={size} src={src} alt={tab.url ? `Icon for ${tab.url.host}` : ''} className="select-none" />
  );
};
