import * as React from 'react';
import { useSearchResults } from './useSearchResults';
import styled from 'styled-components';
import { TrackSelectList } from '../../TrackSelectList';

const Wrapper = styled.div``;

const Section = styled.div``;

const SectionHeader = styled.h3`
  padding: 0 ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[1]};
  margin-top: 0;
`;

interface Props {
  query: string;
}

export function SearchResults({ query }: Props) {
  const searchResults = useSearchResults(query);

  return (
    <Wrapper>
      {searchResults.data.search.tracks && (
        <Section>
          <SectionHeader>Tracks</SectionHeader>
          <TrackSelectList tracks={searchResults.data.search.tracks.items} />
        </Section>
      )}
    </Wrapper>
  );
}
