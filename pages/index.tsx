import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';

import BigSearch from '../components/BigSearch';
import Layout from '../components/Layout';
import ModuleList from '../components/ModuleList';
import Paginate from '../components/Paginate/Paginate';
import globalValue from '../contexts/Global';
import SEARCH_MODULE from '../graphql/searchModules';
import PATHS, { getPage } from '../lib/paths';
import { canonical } from '../lib/analytics';

// Index page also is the search page for now but it could become
// a more "commercial" landing page at some point

const ELEMENTS_PER_PAGE = 5;

const ResultTitle = ({ title }: { title: string }): JSX.Element => <p className="h3 m0 mt1 mb3">{ title }</p>;

const Pagination = styled.div`
  white-space: nowrap;
  overflow: scroll;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ResultPlaceholder = (): JSX.Element => (
  <div className="center">
    <p>
      🤔 Feeling a bit lost?&nbsp;
      <Link href={getPage('quickstart-guide')}><a>Check our quickstart guide.</a></Link>
    </p>

    <p>
      🎉 Announcing our blog!&nbsp;
      <Link href={PATHS.BLOG}><a>Read it here.</a></Link>
    </p>
  </div>
);

interface QueryOptions {
  query: string;
  type?: string;
}

const Modules = (): JSX.Element => {
  const global = useContext(globalValue);
  const [ query, setQuery ] = useState<QueryOptions>({ query: '', type: undefined });
  const [ page, setPage ] = useState(1);
  const [ total, setTotal ] = useState(0);

  const { data, loading, error } = useQuery(SEARCH_MODULE, {
    variables: {
      search: query.query,
      type: query.type,
      pagination: {
        pageSize: ELEMENTS_PER_PAGE,
        pageNumber: page,
        includeCount: true,
      },
    },
  });

  useEffect((): void => global.setActivePath(PATHS.MODULES), [ global ]);

  let result = <ResultPlaceholder />;
  let tmpTotal = total;
  if (!query) {
    tmpTotal = 0;
  } else if (error) {
    tmpTotal = 0;
    result = (
      <>
        <ResultTitle title="Error" />
        <pre><code>{ error.message }</code></pre>
      </>
    );
  } else if (loading) {
    tmpTotal = 0;
    result = <ResultTitle title="Loading..." />;
  } else if (data.search.result.length === 0) {
    tmpTotal = 0;
    result = (
      <>
        <ResultTitle title="There is no matching module" />
        <p>Sorry about that... You should try using different keywords.</p>
      </>
    );
  } else {
    const results = data.search.result;
    const totalCount = data.search.totalRecords;
    tmpTotal = totalCount;

    result = (
      <>
        <ResultTitle title={`${totalCount} matching modules`} />
        <ModuleList modules={results} />
      </>
    );
  }

  // Weird shit to avoid trigger an infinite render loop
  // Will need some rework
  if (total !== tmpTotal) {
    setTotal(tmpTotal);
  }

  const title = 'Dessert';
  const description = 'Dessert: from JavaScript to WebAssembly!';

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical('')}
        openGraph={{
          title,
          description,
        }}
      />
      <Layout>
        <div className="mt3" />
        <BigSearch
          onSearch={(s, t?): void => {
            setQuery({ query: s, type: t });
            setPage(1);
          }}
        />

        <div className="mt4" />
        { result }

        {
          result !== null && total > ELEMENTS_PER_PAGE && (
            <Pagination>
              <p className="center mb3 mt3">
                <Paginate
                  currentPage={page}
                  elementsPerPage={ELEMENTS_PER_PAGE}
                  total={total}
                  onPageChange={setPage}
                />
              </p>
            </Pagination>
          )
        }
      </Layout>
    </>
  );
};

const Index = (): JSX.Element => <Modules />;

export default Index;
