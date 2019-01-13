import * as React from 'react';
import { useSelectedTracks } from 'context/SelectedTracks';
import Button from 'components/Button';
import posed, { PoseGroup } from 'react-pose';
import { GET_PARTY } from './queries';
import AddTracksMutation from './mutations/AddTracksMutation';
import TracksAdded from './TracksAdded';
import styled from 'styled-components';
import IconButton from 'components/IconButton';
import CloseIcon from 'icons/CloseIcon';

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
  position: sticky;
  bottom: 0;
  background: ${props => props.theme.colors.primary};
  align-items: center;
  box-shadow: rgba(200, 223, 245, 0.2) 0px -8px 16px 0px;
  padding: ${props => props.theme.spacing[2]};
  justify-content: space-between;
  width: 100%;
`;

const PullRight = styled.div`
  display: flex;
  align-items: center;
`;

const CtaButton = styled(Button)`
  margin-right: ${props => props.theme.spacing[2]};
`;

function AddSelectedTracks({ partyId }: { partyId: string }) {
  const {
    selectedTracks,
    clearSelectedTracks,
    commitTracks,
    commitSuccess,
  } = useSelectedTracks();

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
              <PullRight>
                <CtaButton
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
                </CtaButton>
                <IconButton onClick={clearSelectedTracks}>
                  <CloseIcon />
                </IconButton>
              </PullRight>
            </SelectedTracksWrapper>
          )}
          {commitSuccess && (
            <TracksAdded as={PosedSelectedTracks} key="tracksAdded" />
          )}
        </PoseGroup>
      )}
    </AddTracksMutation>
  );
}

export default AddSelectedTracks;
