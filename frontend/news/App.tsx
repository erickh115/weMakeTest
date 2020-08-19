import React, {useState, Component} from 'react';
import {
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  ApolloClient,
  from,
} from '@apollo/client';
import {Router, Scene} from 'react-native-router-flux';

import UserQuery from './Query';
function App() {
  const GRAPHQL_ENDPOINT = 'http://localhost:8000/graphql?';
  function apolloClient() {
    const link = new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    });

    return new ApolloClient({
      link: from([link]),
      cache: new InMemoryCache(),
    });
  }
  const client = apolloClient();
  return (
    <ApolloProvider client={client}>
      <Router>
        <Scene key="root">
          <Scene
            key="userQuery"
            component={UserQuery}
            initial={true}
            hideNavBar
          />
        </Scene>
      </Router>
    </ApolloProvider>
  );
}

export default App;
