import gql from 'graphql-tag';

export default gql`
query($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
        description
        forkCount
        homepageUrl
        nameWithOwner
        licenseInfo {
          spdxId
        }
        stargazers {
            totalCount
        }
        watchers {
            totalCount
        }
        object(expression: "master:README.md") {
          ... on Blob {
              text
          }
        }
    }
}
`;
