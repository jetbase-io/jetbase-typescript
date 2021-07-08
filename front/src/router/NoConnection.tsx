import React from 'react';
import { Button } from 'antd';

import { Page } from 'components/Page';

export type NoConnectionProps = {};
export const NoConnection: React.FC<NoConnectionProps> = () => {
  return <Page className='page-centered'>
    <main>
      <p>
        Server unavailable. Try to refresh the page.
      </p>
      <div>
        <Button
          onClick={() => window.location.reload()}
          type='primary'
        >Refresh</Button>
      </div>
    </main>
  </Page>;
};
