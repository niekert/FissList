import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import {
  FavoriteTrack,
  FavoriteTrackVariables,
} from './__generated__/FavoriteTrack';
import { PARTY_QUERY, GetPartyById, GetPartyByIdVariables } from '../queries';
import { usePartyContext } from '../context';

const FAVORITE_TRACK_MUTATION = gql`
  mutation FavoriteTrack($trackId: String!, $favorite: Boolean!) {
    favorite(trackId: $trackId, favorite: $favorite)
  }
`;

export function useFavoriteTrack(trackId: string, favorite: boolean) {
  const party = usePartyContext();

  return useMutation<FavoriteTrack, FavoriteTrackVariables>(
    FAVORITE_TRACK_MUTATION,
    {
      variables: {
        favorite,
        trackId,
      },
      optimisticResponse: {
        favorite,
      },
      update(store, { data }) {
        const partyQuery = store.readQuery<GetPartyById, GetPartyByIdVariables>(
          {
            query: PARTY_QUERY,
            variables: { partyId: party.id },
          },
        );

        if (!partyQuery || !data) {
          return;
        }

        store.writeQuery<GetPartyById, GetPartyByIdVariables>({
          query: PARTY_QUERY,
          variables: { partyId: party.id },
          data: {
            party: {
              ...partyQuery.party,
              activeTrack: {
                ...partyQuery.party.activeTrack,
                isFavorited: data!.favorite,
              },
            },
          },
        });
      },
    },
  );
}
