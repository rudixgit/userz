import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';
/* eslint-disable @next/next/no-script-component-in-head */
import { ReactNode } from 'react';

import Footer from './Footer';

const Header = dynamic(() => import("./Header"), {ssr: false});

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  hideFooter?: boolean;
  title?: string;
  noContainer?: boolean;
  adsense?: boolean;
};

const Main = (props: IMainProps) => {
  return (
    <div className="flex flex-col h-screen">
      {props.meta}
      <Head>
        <Script
          async
          custom-element="amp-ad"
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
        />
      </Head>
      <Header />
      {props.noContainer ? (
        <main className="flex z-20 grow">{props.children}</main>
      ) : (
        <main className="container mx-auto z-20 grow px-1">
          {props.children}
        </main>
      )}
      <Footer hideFooter={props.hideFooter} />
    </div>
  );
};
export default Main;
