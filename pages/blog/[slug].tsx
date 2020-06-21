import moment from 'moment';
import { NextPageContext } from 'next';
import Prism from 'prismjs';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';

import Error from '../_error';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import globalValue from '../../contexts/Global';
import { getPost, assertSingleSlug } from '../../lib/ghostClient';
import { NOT_FOUND } from '../../lib/httpCodes';
import PATHS from '../../lib/paths';
import { Post } from '../../types/Post';

import '../../css/blogpost.css';
import { canonical } from '../../lib/analytics';

const PostDate = styled.p`
  color: #444;
`;

interface Props {
  post?: Post;
}

const PostDisplay = ({ post }: Props): JSX.Element => {
  const global = useContext(globalValue);

  global.setActivePath(PATHS.BLOG);

  useEffect((): void => {
    Prism.highlightAll();
  }, []);

  if (post === undefined) {
    return <Error statusCode={NOT_FOUND} />;
  }

  const {
    title,
    html,
    published,
    slug,
  } = post;
  const description = `Read '${title}' on Dessert`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical(`blog/${slug}`)}
        openGraph={{
          title,
          description,
        }}
      />

      <Layout>
        <div className="blogpost">
          <PageTitle nospace>{ title }</PageTitle>
          <PostDate className="h4 m0 mt1 mb3">
            Published on
            { moment(published).format('L') }
          </PostDate>

          { /* We are trusting the source here */ }
          { /* eslint-disable-next-line react/no-danger */ }
          <div className="blogpost-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </Layout>
    </>
  );
};

PostDisplay.getInitialProps = async ({ query }: NextPageContext): Promise<Props> => {
  const { slug } = query;

  try {
    const post = await getPost(assertSingleSlug(slug));
    return { post };
  } catch (e) {
    // Variable post is undefined, will trigger a 404
    return {};
  }
};

export default PostDisplay;
