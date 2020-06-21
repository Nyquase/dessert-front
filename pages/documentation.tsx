import Link from 'next/link';
import { useContext } from 'react';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';

import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import globalValue from '../contexts/Global';
import PATHS, { getPage } from '../lib/paths';
import { canonical } from '../lib/analytics';

const Spaced = styled.li`
  margin: 8px 0;
`;

const Documentation = (): JSX.Element => {
  const global = useContext(globalValue);

  global.setActivePath(PATHS.DOCUMENTATION);

  const title = 'Dessert Documentation Center';
  const description = 'Need help? Read the Dessert Documentation Center!';

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical('documentation')}
        openGraph={{
          title,
          description,
        }}
      />

      <Layout>
        <PageTitle>Documentation</PageTitle>
        <p>Here are a few ressources that might help you...</p>

        <ul>
          <Spaced>
            <Link
              href={PATHS.PAGE_FS}
              as={getPage('who-are-we')}
            >
              <a>Who Are We?</a>
            </Link>
          </Spaced>
          <Spaced>
            <Link
              href={PATHS.PAGE_FS}
              as={getPage('why-dessert')}
            >
              <a>Why Dessert?</a>
            </Link>
          </Spaced>
          <Spaced>
            <Link
              href={PATHS.PAGE_FS}
              as={getPage('quickstart-guide')}
            >
              <a>Quickstart Guide</a>
            </Link>
          </Spaced>
          <Spaced>
            <Link
              href={PATHS.PAGE_FS}
              as={getPage('cli-documentation')}
            >
              <a>CLI Documentation</a>
            </Link>
          </Spaced>
        </ul>

        <p>
          Not what you are looking for? Take a look at
          <Link
            href={PATHS.PAGE_FS}
            as={getPage('faq')}
          >
            <a>our FAQ</a>
          </Link>
          .
        </p>
      </Layout>
    </>
  );
};

export default Documentation;
