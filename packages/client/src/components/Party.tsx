import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const PartyName = styled.span``;

interface IProps {
  name: string;
  onClick: () => void;
}

function Party({ name, onClick }: IProps) {
  return (
    <Wrapper onClick={onClick}>
      <PartyName>{name}</PartyName>
    </Wrapper>
  );
}

export default Party;
