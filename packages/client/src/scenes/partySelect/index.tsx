import * as React from 'react';
import useUnlink from 'hooks/useUnlink';
import { WithApolloClient, withApollo } from 'react-apollo';
import CurrentUserContext from 'context/CurrentUser';
import Page from 'components/Page';
import styled from 'styled-components';
import OptionCard from './OptionCard';
import Link from 'components/Link';

const PartyOptions = styled.div`
  max-width: 350px;
  margin: 0 auto;
`;

const Intro = styled.p``;

const Welcome = styled.h1`
  text-align: center;
`;

function PartySelect({ client }: WithApolloClient<{}>) {
  console.log('client is', client);
  // TODO: this API is unforunate.
  // Would be nicec if we could have `useApollo` in `useUnlink`.
  const unlink = useUnlink(client);

  return (
    <CurrentUserContext.Consumer>
      {currentUser => {
        if (!currentUser) {
          return null;
        }

        return (
          <Page>
            <Welcome>Welcome to PartyPlay!</Welcome>
            <Intro>Start a new party, or join a friends' party</Intro>

            <PartyOptions>
              <OptionCard
                title="Start a new party"
                body="Woohoo! Click this button to start a new party and share the link to the party with your friends!"
                cta={'Start party'}
                onClick={() => {}}
              />
              <OptionCard
                title="Join a party"
                body="Join a friend's party by filling in the party code"
                cta={'Join party'}
                onClick={() => {}}
              />
            </PartyOptions>

            <p>
              Or, if you are done using PartyPlay,{' '}
              <Link onClick={() => unlink()}>Log out</Link>
            </p>
          </Page>
        );
      }}
    </CurrentUserContext.Consumer>
  );
}

export default withApollo(PartySelect);
