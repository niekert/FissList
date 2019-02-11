import * as React from 'react';
import { useSelectedTracks } from 'context/SelectedTracks';
import Button from 'components/Button';
import posed, { PoseGroup } from 'react-pose';
import { PARTY_QUERY } from './queries';
import AddTracksMutation from './mutations/AddTracksMutation';
import styled from 'styled-components';
import IconButton from 'components/IconButton';
import CloseIcon from 'icons/CloseIcon';
import Notification from './Notification';
import { MAX_TRACKS_TO_REQUEST } from 'app-constants';

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
    isOverLimit,
    clearWarnings,
  } = useSelectedTracks();

  return (
    <AddTracksMutation
      onCompleted={commitTracks}
      refetchQueries={[
        {
          query: PARTY_QUERY,
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
            <Notification
              onClick={clearWarnings}
              key="commitTracks"
              as={PosedSelectedTracks}
              emoji={'🎉'}
              content={
                <>
                  <b>Done!</b> The tracks you selected are added to the queue
                </>
              }
            />
          )}
          {isOverLimit && (
            <Notification
              onClick={clearWarnings}
              key="overLimit"
              as={PosedSelectedTracks}
              emoji={'🤭'}
              content={
                <>
                  You can only request <b>{MAX_TRACKS_TO_REQUEST}</b> tracks at
                  the time!
                </>
              }
            />
          )}
        </PoseGroup>
      )}
    </AddTracksMutation>
  );
}

export default AddSelectedTracks;
