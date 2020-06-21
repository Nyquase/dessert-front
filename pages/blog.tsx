import moment from 'moment';
import Link from 'next/link';
import { useContext } from 'react';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';

import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import globalValue from '../contexts/Global';
import { getAllPosts } from '../lib/ghostClient';
import PATHS, { getBlogPost } from '../lib/paths';
import { PostEntry } from '../types/Post';
import { canonical } from '../lib/analytics';

const EntryTitle = styled.a`
  color: #444 !important;
`;

const EntryDate = styled.div`
  margin-bottom: 8px;
`;

const BlogEntry = ({ post }: { post: PostEntry }): JSX.Element => {
  const { slug, title, published } = post;

  return (
    <div className="mb3">
      <EntryDate className="muted h3">{ moment(published).format('L') }</EntryDate>
      <Link
        href={PATHS.BLOG_FS}
        as={getBlogPost(slug)}
        passHref
      >
        <EntryTitle className="h3">{ title }</EntryTitle>
      </Link>
    </div>
  );
};

interface Props {
  posts: PostEntry[];
}

const Blog = (props: Props): JSX.Element => {
  const global = useContext(globalValue);
  global.setActivePath(PATHS.BLOG);

  const { posts } = props;
  const renderBloglist = posts.length > 0;
  // No posts is considered an error
  // We don't really know if we failed to reach the endpoint, or if we just
  // don't get any articles in the answer but the result is the same for the user

  const title = 'Dessert Blog';
  const description = 'The blog of the Dessert project';

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical('blog')}
        openGraph={{
          title,
          description,
        }}
      />
      <Layout>
        <PageTitle>
          { renderBloglist ? 'Dessert Blog' : 'An error occured...' }
        </PageTitle>

        {
          renderBloglist
            ? (
              posts.map((post: PostEntry): JSX.Element => (<BlogEntry post={post} key={post.id} />))
            )
            : (
              <p>Don&apos;t worry, this is on our side, it will be fixed soon!</p>
            )
        }
      </Layout>
    </>
  );
};

Blog.getInitialProps = async (): Promise<Props> => {
  try {
    const postsRaw = await getAllPosts();

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const posts = postsRaw.map((post: any): PostEntry => ({ //
      id: post.id,
      title: post.title,
      slug: post.slug,
      published: new Date(post.published_at),
    }));

    return { posts };
  } catch (e) {
    return { posts: [] };
  }
};

export default Blog;
