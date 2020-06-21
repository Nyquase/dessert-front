// No type definition, any is fine
// See documentation to know what to expect: https://ghost.org/docs/api/v3/content/
/* eslint-disable @typescript-eslint/no-explicit-any */

import GhostContentAPI from '@tryghost/content-api';

const client = new GhostContentAPI({
  url: process.env.DESSERT_GHOST_URL,
  key: process.env.DESSERT_GHOST_KEY,
  version: 'v2',
});

export const getAllPosts = (): any => client.posts.browse({ limit: 'all' });

export const getPage = (slug: string): any => client.pages.read({ slug });

export const getPost = (slug: string): any => client.posts.read({ slug });

export const assertSingleSlug = (slug: string | string[]): string => {
  if (Array.isArray(slug)) {
    return slug[0];
  }

  return slug as string;
};
