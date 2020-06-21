import gql from 'graphql-tag';

export default gql`
    mutation ($email: String!, $password: String!, $remember: Boolean!){
        login(email: $email, password: $password, remember: $remember){
            id
        }
    }
`;
