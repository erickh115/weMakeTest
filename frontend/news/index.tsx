import {HttpLink, InMemoryCache, ApolloClient, from} from '@apollo/client';

const GRAPHQL_ENDPOINT = 'http://localhost:8000/graphql?';

export default function apolloClient() {
  const link = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  });

  return new ApolloClient({
    link: from([link]),
    cache: new InMemoryCache(),
  });
}
