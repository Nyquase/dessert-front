import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';

// The global context is accessible to any page
import { GlobalContextProvider } from '../contexts/Global';
// Wrap application with Apollo client
import withApollo from '../lib/withApollo';

// Files imported here are available globally so it looks at this is
// a great location for our CSS framework
import '../css/basscss.min.css';
import '../css/basscss-color.css';
import '../css/basscss-forms.css';
import '../css/basscss-btn.css';
import '../css/basscss-btn-primary.css';
import '../css/basscss-background-color.css';

// Syntax coloration for the blog, the pages...
import '../css/prism.css';

// Also load fonts via CSS
import '../css/fonts.css';

// Global CSS, for things that concern all pages
// without any condition
import '../css/global.css';
import { ModalDisplayContextProvider } from '../contexts/ModalDisplayer';

interface Props {
  apollo: ApolloClient<{}>;
}

class MyApp extends App<Props> {
  render = (): JSX.Element => {
    const { Component, pageProps, apollo } = this.props;

    return (
      <>
        <Head><title>Dessert</title></Head>

        <ApolloProvider client={apollo}>
          <GlobalContextProvider>
            <ModalDisplayContextProvider>
              <>
                { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
                <Component {...pageProps} />
              </>
            </ModalDisplayContextProvider>
          </GlobalContextProvider>
        </ApolloProvider>
      </>
    );
  };
}

export default withApollo(MyApp);
