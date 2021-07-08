import React from 'react';
import { Spin } from 'antd';

import { Page } from './Page';

export const PageSpiner = React.memo(({ className }: { className?: string }) => {
  let cn = 'page-spiner ';
  if (className) {
    cn += className;
  }
  return <Page className={cn}>
    <Spin
      spinning={true}
      size="large"
    />
  </Page>;
});
