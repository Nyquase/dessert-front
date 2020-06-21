import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { useEffect, useContext } from 'react';
import { NextSeo } from 'next-seo';

import Layout from '../components/Layout';
import ModuleList from '../components/ModuleList';
import ProfileHeader from '../components/ProfileHeader';
import globalValue from '../contexts/Global';
import GET_USER from '../graphql/getUser';
import { SERVICE_UNAVAILABLE, NOT_FOUND } from '../lib/httpCodes';
import PATHS from '../lib/paths';
import LOGOUT from '../graphql/logout';

import Error from './_error';
import TokenEditor from '../components/TokenEditor';
import { canonical } from '../lib/analytics';

// Profile of an user, of self

const MAX_MODULES_DISPLAY = 3;

interface OwnProfileBlockProps {
  user: any;
}

const OwnProfileBlock = (props: OwnProfileBlockProps): JSX.Element => {
  const apolloClient = useApolloClient();
  const { user } = props;

  const doLogout = async () => {
    await apolloClient.mutate({
      mutation: LOGOUT,
    });
    await apolloClient.resetStore();
    document.location.pathname = PATHS.INDEX;
  };

  return (
    <>
      <p className="h3 mt4">Account</p>

      <p>
        This is your account. It is visible to the other users.
      </p>

      <button type="button" onClick={doLogout} className="btn btn-primary">Log Out</button>

      <p>
        <Link href={PATHS.PROFILE_EDIT}><a>Manage your account.</a></Link>
      </p>

      <TokenEditor tokens={user.tokens} />
    </>
  );
};

interface ProfileRenderProps {
  userId: number;
}

const ProfileRender = ({ userId }: ProfileRenderProps): JSX.Element => {
  const global = useContext(globalValue);

  useEffect((): void => global.setActivePath(PATHS.PROFILE));

  const queryModules = useQuery(GET_USER, {
    variables: {
      author: userId,
      pagination: {
        pageNumber: 1,
        pageSize: MAX_MODULES_DISPLAY,
        includeCount: true,
      },
    },
  });

  if (queryModules.loading) {
    return <p>Loading...</p>;
  }

  if (queryModules.error) {
    return <Error statusCode={SERVICE_UNAVAILABLE} />;
  }

  const { user } = queryModules.data;
  if (!user) {
    return <Error statusCode={NOT_FOUND} />;
  }

  const isSelf = user.id === global.user?.id;

  const title = `${user.nickname} on Dessert`;
  const description = `View ${user.nickname}'s profile on Dessert!`;

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
        <div className="center">
          <ProfileHeader user={user} />
        </div>

        { isSelf && <OwnProfileBlock user={user} /> }

        <p className="h3 mt4">Latest modules</p>
        { user.modules.result.length === 0 && (
          <p>This user has not published any modules yet.</p>
        ) }
        { user.modules.result.length > 0 && (
          <ModuleList showAuthor={false} modules={user.modules.result} />
        ) }
      </Layout>
    </>
  );
};

interface Props {
  id?: number ;
}

const Profile = ({ id }: Props): JSX.Element => {
  const global = useContext(globalValue);

  if (id === undefined && global.user) {
    return <ProfileRender userId={global.user.id} />;
  }
  if (id) {
    return <ProfileRender userId={id} />;
  }
  return <Error statusCode={NOT_FOUND} />;
};

Profile.getInitialProps = (ctx: NextPageContext): Props => {
  const { id } = ctx.query;

  if (id === undefined) {
    return { id };
  }

  const parsedId = parseInt(id as string, 10);
  return { id: parsedId };
};

export default Profile;
