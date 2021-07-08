import React from 'react';

import './Page.scss';

export type PageProps = {
  className?: string;
};
export const Page: React.FC<PageProps> = (props) => {
  let className = 'page ';
  if (props.className) {
    className += props.className;
  }

  return <div className={className}>
    {props.children}
  </div>;
};
