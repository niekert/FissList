import * as React from 'react';
import { Route } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { RouteComponentProps } from 'react-router';
import Playlists from './scenes/playlists';
import { SearchBar, SearchResults } from './scenes/search';
import Spinner from 'components/Spinner';

interface Props extends RouteComponentProps {}

const SEARCH_DEBOUNCE_MS = 2000;

function Browse(props: Props) {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const debouncedSearch = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS);

  const isSearchActive = debouncedSearch.length > 0 && searchQuery.length > 0;

  return (
    <>
      <Route
        path={props.match.path}
        exact={true}
        render={() => (
          <SearchBar
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        )}
      />

      <React.Suspense fallback={<Spinner />}>
        {isSearchActive ? (
          <SearchResults query={debouncedSearch} />
        ) : (
          <Playlists {...props} />
        )}
      </React.Suspense>
    </>
  );
}

export default Browse;
