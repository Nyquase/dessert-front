import { useQuery } from '@apollo/react-hooks';
import { NextPageContext } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';

import GithubDisplay from '../components/GithubDisplay';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import GET_MODULE from '../graphql/getModule';
import { NOT_FOUND } from '../lib/httpCodes';
import { getProfile } from '../lib/paths';

import Error from './_error';
import { canonical } from '../lib/analytics';

// Information about ONE module

const Indicator = styled.div`
  display: inline-block;
  padding: 3px 10px;
  box-shadow: 0 1px #FFFFFF inset, 0 1px 3px rgba(34, 25, 25, 0.4);
  color: white;
  background-color: black;
`;

// TODO: Set active path as Modules
const ModuleDisplay = ({ id }: { id: number }): JSX.Element => {
  const { error, loading, data } = useQuery(GET_MODULE, {
    variables: { id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Error:
        { error.message }
      </p>
    );
  }

  const { module } = data;
  const title = `${module.name} on Dessert`;
  const description = `Use ${module.name} on Dessert!`;


  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical('module')}
        openGraph={{
          title,
          description,
        }}
      />

      <Layout>
        <div className="mb3">
          <PageTitle nospace>{ module.name }</PageTitle>
          <Indicator className="mt1">{ (module.isCore && 'CORE') || 'CONNECTOR' }</Indicator>

          <p>
            Authored by&nbsp;
            <Link href={getProfile(module.author.id)}>
              <a>
                @
                { module.author.nickname.toLowerCase() }
              </a>
            </Link>
          </p>
        </div>

        { module.githubLink && (
        <div className="mb2">
          Go to
          { ' ' }
          <a href={module.githubLink}>code</a>
        </div>
        ) }

        { ((): JSX.Element => {
          if (!module.githubLink) { return <div>[Github view not available]</div>; }
          const [ _, owner, repoName ] = module.githubLink.match(/^\w+:\/\/github.com\/([\w-]+)\/([\w-]+)$/);
          return <GithubDisplay name={repoName} owner={owner} />;
        })() }

      </Layout>
    </>
  );
};

interface Props {
  moduleId?: number;
  statusCode?: number;
}

const Module = (props: Props): JSX.Element => {
  const { moduleId, statusCode } = props;

  if (statusCode !== undefined || moduleId === undefined) {
    return <Error statusCode={NOT_FOUND} />;
  }

  return <ModuleDisplay id={moduleId} />;
};

Module.getInitialProps = (ctx: NextPageContext): Props => {
  const { id } = ctx.query;

  if (id === undefined) {
    return { statusCode: 404 };
  }

  const parsedId = parseInt(id as string, 10);
  return { moduleId: parsedId };
};

export default Module;
