enum PATHS {
  INDEX = '/',
  MODULES = '/',
  MODULE = '/module',
  DOCUMENTATION = '/documentation',
  PAGE = '/page',
  PAGE_FS = '/page/[slug]',
  BLOG = '/blog',
  BLOG_FS = '/blog/[slug]',
  PROFILE = '/profile',
  PROFILE_EDIT = '/profile/edit',
  LOGIN = '/account/login',
  REGISTER = '/account/register',
  UNKNOWN = ''
}

export const getPage = (slug: string): string => `${PATHS.PAGE}/${slug}`;
export const getBlogPost = (slug: string): string => `${PATHS.BLOG}/${slug}`;
export const getModule = (id: number): string => `${PATHS.MODULE}?id=${id}`;
export const getProfile = (id: number): string => `${PATHS.PROFILE}?id=${id}`;

export default PATHS;
