import { NextPageContext } from 'next';
import Prism from 'prismjs';
import { useContext, useEffect } from 'react';
import { NextSeo } from 'next-seo';

import Error from '../_error';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import globalValue from '../../contexts/Global';
import { getPage, assertSingleSlug } from '../../lib/ghostClient';
import { NOT_FOUND } from '../../lib/httpCodes';
import PATHS from '../../lib/paths';
import { Post } from '../../types/Post';

import '../../css/blogpost.css';
import { canonical } from '../../lib/analytics';

interface Props {
  post?: Post;
}

const PageDisplay = ({ post }: Props): JSX.Element => {
  const global = useContext(globalValue);

  global.setActivePath(PATHS.DOCUMENTATION);

  useEffect((): void => {
    Prism.highlightAll();
  }, []);

  if (post === undefined) {
    return <Error statusCode={NOT_FOUND} />;
  }

  const { title, html, slug } = post;
  const description = `Read '${title}' on Dessert`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical(`page/${slug}`)}
        openGraph={{
          title,
          description,
        }}
      />

      <Layout>
        <div className="blogpost">
          <PageTitle>{ title }</PageTitle>

          { /* We are trusting the source here */ }
          { /* eslint-disable-next-line react/no-danger */ }
          <div className="blogpost-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </Layout>
    </>
  );
};

PageDisplay.getInitialProps = async ({ query }: NextPageContext): Promise<Props> => {
  const { slug } = query;

  try {
    const post = await getPage(assertSingleSlug(slug));
    return { post };
  } catch (e) {
    // Variable post is undefined, will trigger a 404
    return {};
  }
};

export default PageDisplay;
