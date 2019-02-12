import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { split, from, Observable } from 'apollo-link';
import { API_HOST, WS_SUBSCRIPTION_HOST } from 'app-constants';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { onError } from 'apollo-link-error';
import App from './App';
import createHistory from 'history/createBrowserHistory';
import { register } from './serviceworker';
import InitialLoader from 'InitialLoader';
import Theme from 'theme';

register();

const history = createHistory();

const getKeys = () => ({
  accessKey: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
});

const authLink = setContext((_, { headers }) => {
  const { accessKey } = getKeys();

  return {
    headers: {
      ...headers,
      Authorization: accessKey ? `Bearer ${accessKey}` : null,
    },
  };
});

const getConnectionParams = () => {
  const { accessKey } = getKeys();

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
    onError(({ graphQLErrors, operation, forward }) => {
      if (!graphQLErrors || !graphQLErrors.length) {
        return;
      }

      const { accessKey, refreshToken } = getKeys();
      const [error] = graphQLErrors;

      if (
        !error.extensions ||
        error.extensions.code !== 'UNAUTHENTICATED' ||
        !accessKey ||
        !refreshToken
      ) {
        return;
      }

      return new Observable(observer => {
        fetch(`${API_HOST}/refresh`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        })
          .then(resp => resp.json())
          .then(data => {
            localStorage.setItem('accessToken', data.access_token);

            operation.setContext(() => ({
              headers: {
                // Switch out old access token for new one
                authorization: `Bearer ${data.access_token}` || null,
              },
            }));
          })
          .then(() => {
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            };

            // Retry last failed request
            forward(operation).subscribe(subscriber);
          })
          .catch(refreshError => {
            observer.error(refreshError);
          });
      });
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
      <Theme>
        <React.Suspense fallback={<InitialLoader />}>
          <App history={history} />
        </React.Suspense>
      </Theme>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
);
