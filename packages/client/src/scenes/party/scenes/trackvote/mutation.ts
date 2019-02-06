import gql from 'graphql-tag';
import { TrackVote, TrackVoteVariables } from './__generated__/TrackVote';
import { useMutation } from 'react-apollo-hooks';
import { useCurrentUser } from 'context/CurrentUser';
import { usePartyContext } from 'scenes/party/context';
import { QUEUED_TRACK_DETAILS, QueuedTrackDetails } from 'scenes/party/queries';
import { QueuedTrackDetailsVariables } from 'scenes/party/__generated__/QueuedTrackDetails';

const TRACK_VOTE_MUTATION = gql`
  mutation TrackVote($queuedTrackId: String!) {
    trackVote(queuedTrackId: $queuedTrackId)
  }
`;

export function useTrackVoteMutation() {
  const mutation = useMutation<TrackVote, TrackVoteVariables>(
    TRACK_VOTE_MUTATION,
  );
  const party = usePartyContext();
  const user = useCurrentUser();

  return (queuedTrackId: string, isActive: boolean) => {
    return mutation({
      variables: {
        queuedTrackId,
      },
      refetchQueries: [
        { query: QUEUED_TRACK_DETAILS, variables: { partyId: party.id } },
      ],
      update(store, { data }) {
        const queuedTracksQuery = store.readQuery<QueuedTrackDetails>({
          query: QUEUED_TRACK_DETAILS,
          variables: { partyId: party.id },
        });

        if (!queuedTracksQuery || !data) {
          return;
        }

        const nextTracks = queuedTracksQuery.queuedTracks.map(queuedTrack => {
          if (queuedTrack.id !== queuedTrackId) {
            return queuedTrack;
          }

          return {
            ...queuedTrack,
            userVotes: data.trackVote
              ? [...queuedTrack.userVotes, user!.id]
              : queuedTrack.userVotes.filter(userId => userId !== user!.id),
          };
        });

        store.writeQuery<QueuedTrackDetails, QueuedTrackDetailsVariables>({
          query: QUEUED_TRACK_DETAILS,
          variables: { partyId: party.id },
          data: {
            queuedTracks: nextTracks,
          },
        });
      },
      optimisticResponse: {
        trackVote: !isActive,
      },
    });
  };
}
