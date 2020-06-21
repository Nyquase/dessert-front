import gql from 'graphql-tag';

export default gql`
mutation($nickname: String!, $profilePicUrl: String!) {
  updateUser(account: { nickname: $nickname, profilePicUrl: $profilePicUrl }) {
    id
      nickname
      profilePicUrl
  }
}
`;
