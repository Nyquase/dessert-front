import gql from 'graphql-tag';

export default gql`
    query getUser($author: Int!, $pagination: PaginationQueryInput!) {
        user(id: $author) {
            id
            nickname
            profilePicUrl
            tokens {
                id
                token
                description
            }
            modules(pagination: $pagination) {
                totalRecords
                result {
                    id
                    name
                    description
                    publishedDateTime
                    author {
                        id
                        nickname
                        profilePicUrl
                    }
                    tags {
                        id
                        name
                    }
                }
            }
        }
    }
`;
