import gql from 'graphql-tag';

export default gql`
query($search: String!, $type: ModuleTypeEnum, $pagination: PaginationQueryInput!) {
  search(query: $search, type: $type, pagination: $pagination) {
    totalPages
    totalRecords
    pageNumber
    pageSize
    result {
      id
      name
      description
        publishedDateTime
        author {
          id
            nickname
        }
        tags {
          id
          name
        }
    }
  }
}
`;
