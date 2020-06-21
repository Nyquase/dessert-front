import { useEffect } from 'react';

import Head from 'next/head';
import useMedia from 'use-media';

import Footer from './Footer';
import Header from './Header';
import { initGA, logPageView } from '../../lib/analytics';

// All pages must be wrapped by this component
// Injects the topbar, the footer, etc

interface Props {
  children: React.ReactNode;
}

// Works but feels weird
interface Window {
  GA_INITIALIZED: boolean;
}

declare const window: Window;

const Layout = ({ children }: Props): JSX.Element => {
  const isWide = useMedia({ minWidth: 800 });

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }

    logPageView();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
      </Head>

      <div className="fixed top-0 left-0 right-0">
        <Header />
      </div>

      { isWide && <div className="mt3" /> }
      <div className="max-width-3 mx-auto pt3 p1">

        { children }

      </div>

      <div className="mt4 mb2">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
