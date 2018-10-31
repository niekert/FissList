import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { API_HOST } from 'app-constants';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
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

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        // TODO: figure out error handling
        graphQLErrors.map(({ message, locations, path }) =>
          // tslint:disable-next-line
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) {
        // tslint:disable-next-line
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    new HttpLink({
      uri: API_HOST,
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
);
