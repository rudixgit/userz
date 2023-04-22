import dynamic from 'next/dynamic';
import React from 'react';

interface Props {
  children: React.ReactNode;
}
function NoSSR({children}: Props): JSX.Element {
  return (<>{children}</>) as JSX.Element;
}

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
