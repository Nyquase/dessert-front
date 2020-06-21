import gql from 'graphql-tag';

export default gql`
    mutation($description: String!) {
        createToken(description: $description)
    }
`;
