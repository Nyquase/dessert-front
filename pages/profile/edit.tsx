import { useMutation } from '@apollo/react-hooks';
import { useContext, useState, useEffect } from 'react';

import Layout from '../../components/Layout';
import ProfileHeader from '../../components/ProfileHeader';
import globalValue from '../../contexts/Global';
import UPDATE_USER from '../../graphql/updateUser';
import DELETE_USER from '../../graphql/deleteUser';
import PATHS from '../../lib/paths';
import Error from '../_error';
import { SERVICE_UNAVAILABLE } from '../../lib/httpCodes';
import CREATE_TOKEN from '../../graphql/createToken';

// Self user can edit its own information

const ProfileEdit = (): JSX.Element => {
  const global = useContext(globalValue);
  const { user } = global;

  if (!user) return <Error statusCode={SERVICE_UNAVAILABLE} />;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ nickname, setNickname ] = useState(user.nickname);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ profilePicUrl, setProfilePicUrl ] = useState(user.profilePicUrl);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ updateUser, updateMutation ] = useMutation(UPDATE_USER);
  // eslint-disable-next-line react-hooks/rules-of-hooks,@typescript-eslint/no-unused-vars
  const [ deleteUser, _ ] = useMutation(DELETE_USER);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect((): void => global.setActivePath(PATHS.PROFILE));

  const handleUserUpdate = async () => {
    if (nickname === user.nickname && profilePicUrl === user.profilePicUrl) {
      return;
    }

    await updateUser({
      variables: {
        nickname,
        profilePicUrl,
      },
    });

    // TODO: Do not silence this error, the user has to know!
  };

  const doDeleteAccount = async () => {
    await deleteUser();
    document.location.pathname = PATHS.INDEX;
  };

  return (
    <Layout>
      <div className="center">
        <ProfileHeader user={user} />
      </div>

      <p className="h3 mt4">Profile</p>

      <p className="bold">Nickname</p>
      <input
        className="input"
        placeholder={user.nickname}
        value={nickname}
        onChange={(e): void => setNickname(e.target.value)}
      />

      <p className="bold">Profile Picture</p>
      <input
        className="input"
        placeholder={user.profilePicUrl}
        value={profilePicUrl}
        onChange={(e): void => setProfilePicUrl(e.target.value)}
      />

      <br />
      <button
        className="btn bg-black white"
        type="submit"
        onClick={handleUserUpdate}
      >
        { updateMutation.loading ? 'Loading...' : 'Update' }
      </button>

      <p className="h3 mt4">Delete Account</p>

      <p>
        Deleting your account will mark it as
        { ' ' }
        <span className="italic">Unknown</span>
        .
        Thus, it won&apos;t be accessible anymore.
        However, the modules your published will not be deleted.
      </p>

      <br />
      <button onClick={doDeleteAccount} className="btn bg-red white" type="button">Delete my account</button>
    </Layout>
  );
};

export default ProfileEdit;
