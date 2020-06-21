import gql from 'graphql-tag';

export default gql`
query($id: Int!) {
  module(id: $id) {
    id
    name
    description
    isCore
    author {
      id
      nickname
    }
    githubLink
  }
}
`;
