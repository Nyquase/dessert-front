import gql from 'graphql-tag';

export default gql`
    mutation ($email: String!, $nickname: String!, $password: String!){
        register(email: $email, nickname: $nickname, password: $password){
            id
        }
    }
`;
