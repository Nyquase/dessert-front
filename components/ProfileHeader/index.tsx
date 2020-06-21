import { User } from '../../types/User';
import Avatar from '../Avatar';
import PageTitle from '../PageTitle';

interface Props {
  user: User;
}

const ProfileHeader = ({ user }: Props): JSX.Element => (
  <>
    <div className="mt3" />
    <Avatar className="rounded block mx-auto" url={user.profilePicUrl} />
    {
      /*
      We have the backend of the avatars but this introduces
      a lot of code so we will see later
      */
    }

    { /* <PageTitle nospace>
      { user.firstName }
      { ' ' }
      { user. }
    </PageTitle>
    */
    }
    <p className="h3 m0">
      @
      { user.nickname.toLowerCase() }
    </p>
    { /* We don't have the backend for <SocialRibbon /> yet */ }
    <div className="mt3" />
  </>
);

export default ProfileHeader;
