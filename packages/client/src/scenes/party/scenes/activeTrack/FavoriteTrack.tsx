import * as React from 'react';
import { FavoriteIcon } from 'icons';
import IconButton from 'components/IconButton';
import styled from 'styled-components';
import FavoritePose from 'poses/FavoritePose';
import { useFavoriteTrack } from 'scenes/party/mutations/useFavoriteTrack';

interface Props {
  isFavorited: boolean;
  trackId: string;
}

const FavoriteIconButton = styled(IconButton)`
  margin-right ${props => props.theme.spacing[2]};
`;

function FavoriteTrack({ isFavorited, trackId }: Props) {
  const favoriteTrack = useFavoriteTrack(trackId, !isFavorited);
  const [isActive, setIsActive] = React.useState(false);

  return (
    <FavoritePose isActive={isActive} onPoseEnd={() => setIsActive(false)}>
      <FavoriteIconButton
        size="small"
        onClick={() => {
          favoriteTrack({
            variables: {
              trackId,
              favorite: !isFavorited,
            },
          });
          setIsActive(true);
        }}
      >
        <FavoriteIcon isActive={isFavorited} />
      </FavoriteIconButton>
    </FavoritePose>
  );
}

export default FavoriteTrack;
