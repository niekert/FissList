import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { split, from } from 'apollo-link';
import { API_HOST } from 'app-constants';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import App from './App';

const authLink = setContext((_, { headers }) => {
  const accessKey = localStorage.getItem('accessToken');

  return {
    headers: {
      ...headers,
      Authorization: accessKey ? `Bearer ${accessKey}` : null,
    },
  };
});

const getConnectionParams = () => {
  const accessKey = localStorage.getItem('accessToken');

  return {
    Authorization: `Bearer ${accessKey}`,
  };
};

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true,
      connectionParams: getConnectionParams(),
    },
  }),
  from([
    authLink,
    // onError(({ graphQLErrors, networkError }) => {
    //   if (graphQLErrors) {
    //     // TODO: figure out error handling
    //     graphQLErrors.map(({ message, locations, path }) =>
    //       // tslint:disable-next-line
    //       console.log(
    //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    //       ),
    //     );
    //   }
    //   if (networkError) {
    //     // tslint:disable-next-line
    //     console.log(`[Network error]: ${networkError}`);
    //   }
    // }),
    new HttpLink({
      uri: `${API_HOST}/graphql`,
      credentials: 'same-origin',
    }),
  ]),
);

console.log('apihost', API_HOST);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
);
