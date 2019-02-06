import * as React from 'react';
import { Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Playlists from './scenes/playlists';
import { SearchBar, SearchResults } from './scenes/search';
import Spinner from 'components/Spinner';

function Browse(props: RouteComponentProps) {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = React.useState<string>('');
  React.useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchQuery), 1000);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const isSearchActive = debouncedSearch.length > 0 && searchQuery.length > 0;

  return (
    <>
      <Route
        path={props.match.path}
        exact={true}
        render={() => (
          <SearchBar
            onSubmit={() => setDebouncedSearch(searchQuery)}
            onClear={() => {
              setSearchQuery('');
              setDebouncedSearch('');
            }}
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
