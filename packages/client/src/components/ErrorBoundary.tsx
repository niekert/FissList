import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  public state = {
    hasError: false,
    error: null,
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          The page crashed. And there's no design for the error page yet
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
