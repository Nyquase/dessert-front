import { NextPageContext } from 'next';

import { FOUND_REDIRECT } from './httpCodes';

const redirect = (ctx: NextPageContext, path: string): void => {
  if (ctx.res) {
    ctx.res.writeHead(FOUND_REDIRECT, { Location: path });
    ctx.res.end();
  } else {
    document.location.pathname = path;
  }
};

export default redirect;
