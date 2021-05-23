import React, { Component } from 'react';

type ErrorBoundaryProps = {
  children?: React.ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  handleOnError = (event: ErrorEvent): void => {
    this.setState({
      error: event.error,
    });
  };

  handleUnhandledRejection = (event: PromiseRejectionEvent): void => {
    this.setState({
      error: event.reason,
    });
  };

  componentDidMount(): void {
    window.addEventListener('error', this.handleOnError);
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  componentWillUnmount(): void {
    window.removeEventListener('error', this.handleOnError);
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  componentDidCatch(error: Error, errorInfo: unknown): void {
    console.groupCollapsed('ErrorBoundary');
    console.log(error, errorInfo);
    console.groupEnd();
  }

  render(): React.ReactNode {
    if (this.state.error) {
      return (
        <div>
          <h1>There has been an error</h1>
          <p>
            <a href={document.location.href}>{document.location.href}</a>
          </p>
          <p>
            {this.state.error.name}: {this.state.error.message}
          </p>
          <code style={{ whiteSpace: 'pre' }}>{this.state.error.stack}</code>
        </div>
      );
    }

    return this.props.children;
  }
}
