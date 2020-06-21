import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import withApollo from 'next-with-apollo';

const backendLink = new HttpLink({
  uri: process.env.DESSERT_GRAPHQL_URL,
  credentials: 'include',
});

const token = 'b91ab71b8472ca8fa3e9e832b8248a10b54ee415';
const githubLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${token}`,
  },
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link: ApolloLink.split(
    // La giga flemme de chercher le type
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (operation) => operation.getContext().clientName === 'github', // Routes the query to the proper client
    githubLink,
    backendLink,
  ),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default withApollo(
  (): ApolloClient<{}> => client,
);
