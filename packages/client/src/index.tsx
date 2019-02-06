import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { split, from } from 'apollo-link';
import { API_HOST, WS_SUBSCRIPTION_HOST } from 'app-constants';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { onError } from 'apollo-link-error';
import App from './App';
import Spinner from 'components/Spinner';
import styled from 'styled-components';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const PageLoader = styled(Spinner)`
  min-height: 100vh;
`;

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
    uri: `${WS_SUBSCRIPTION_HOST}`,
    options: {
      reconnect: true,
      connectionParams: getConnectionParams(),
    },
  }),
  from([
    authLink,
    onError(({ graphQLErrors }) => {
      if (graphQLErrors) {
        // const hasAuthError = graphQLErrors.some(
        //   err => !!err.extensions && err.extensions.code === 'UNAUTHENTICATED',
        // );
      }
    }),
    new HttpLink({
      uri: `${API_HOST}/graphql`,
      credentials: 'same-origin',
    }),
  ]),
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <React.Suspense fallback={<PageLoader />}>
        <App history={history} />
      </React.Suspense>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
);
