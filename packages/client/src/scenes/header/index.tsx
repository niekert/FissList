import * as React from 'react';
import GetMe from 'queries/GetMe';

function Header() {
  return (
    <GetMe>
      {({ data, loading, error }) => (
        <div>
          yooo Is loading {new String(loading)} {JSON.stringify(data)}
        </div>
      )}
    </GetMe>
  );
}

export default Header;
