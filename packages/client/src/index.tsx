import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import App from './App';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
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
      uri: 'http://localhost:4000',
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
