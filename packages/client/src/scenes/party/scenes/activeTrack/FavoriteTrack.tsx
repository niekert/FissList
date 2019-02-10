import * as React from 'react';
import { FavoriteIcon } from 'icons';
import IconButton from 'components/IconButton';
import styled from 'styled-components';
import FavoritePose from 'poses/FavoritePose';

interface Props {
  isFavorited: boolean;
  trackId: string;
}

const FavoriteIconButton = styled(IconButton)`
  margin-right ${props => props.theme.spacing[2]};
`;

function FavoriteTrack({ isFavorited }: Props) {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <FavoritePose isActive={isActive} onPoseEnd={() => setIsActive(false)}>
      <FavoriteIconButton size="small" onClick={() => setIsActive(true)}>
        <FavoriteIcon isActive={isFavorited} />
      </FavoriteIconButton>
    </FavoritePose>
  );
}

export default FavoriteTrack;
