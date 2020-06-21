import { NextPageContext } from 'next';
import Link from 'next/link';

import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import PATHS from '../lib/paths';

interface Props {
  statusCode: number | null;
}

const Error = (props: Props): JSX.Element => {
  const { statusCode } = props;

  return (
    <Layout>
      <PageTitle>
        Error
        { statusCode !== null && ` ${statusCode}` }
      </PageTitle>
      <p>This is the error page... Doesn&apos;t look very nice, right?</p>

      <p>Here is some fun stuff to do:</p>
      <ul>
        <li><Link href={PATHS.MODULES}><a>Search for a module</a></Link></li>
        <li><Link href={PATHS.BLOG}><a>Read our blog</a></Link></li>
        <li><Link href={PATHS.DOCUMENTATION}><a>Take a look at the documentation</a></Link></li>
      </ul>

      <p>
        If you keep getting that error,
        please,
        { ' ' }
        <Link href={PATHS.UNKNOWN}><a>let us know</a></Link>
        .
      </p>
    </Layout>
  );
};

Error.getInitialProps = ({ res }: NextPageContext): Props => {
  let code = null;
  if (res) {
    code = res.statusCode;
  }

  return { statusCode: code };
};

export default Error;
