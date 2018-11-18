import * as React from 'react';
import { useSelectedTracks } from 'context/SelectedTracks';
import Button from 'components/Button';
import posed, { PoseGroup } from 'react-pose';
import { GET_PARTY } from './PartyQuery';
import AddTracksMutation from './mutations/AddTracksMutation';
import styled from 'styled-components';

const PosedSelectedTracks = posed.div({
  enter: {
    transform: 'translateY(0%)',
  },
  exit: {
    transform: 'translateY(100%)',
  },
});

const SelectedTracksWrapper = styled(PosedSelectedTracks)`
  min-height: 70px;
  display: flex;
  background: ${props => props.theme.colors.primary};
  align-items: center;
  box-shadow: rgba(200, 223, 245, 0.2) 0px -8px 16px 0px;
  padding: ${props => props.theme.spacing[2]};
  justify-content: space-between;
  width: 100%;
`;

function AddSelectedTracks({ partyId }: { partyId: string }) {
  const { selectedTracks, commitTracks } = useSelectedTracks();

  return (
    <AddTracksMutation
      onCompleted={commitTracks}
      refetchQueries={[
        {
          query: GET_PARTY,
          variables: {
            partyId,
          },
        },
      ]}
    >
      {(mutate, { loading }) => (
        <PoseGroup>
          {selectedTracks.length > 0 && (
            <SelectedTracksWrapper key="selectedTracks">
              <span>
                <b>{selectedTracks.length}</b>
                {' tracks selected'}
              </span>
              <Button
                isLoading={loading}
                onClick={() => {
                  mutate({
                    variables: {
                      partyId,
                      trackIds: selectedTracks,
                    },
                  });
                }}
              >
                Add to queue
              </Button>
            </SelectedTracksWrapper>
          )}
        </PoseGroup>
      )}
    </AddTracksMutation>
  );
}

export default AddSelectedTracks;
