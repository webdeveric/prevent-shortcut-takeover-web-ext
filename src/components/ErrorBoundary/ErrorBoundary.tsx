import React, { Component, Fragment, VoidFunctionComponent } from 'react';

import * as styles from './ErrorBoundary.css';

type ErrorBoundaryProps = {
  children?: React.ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

type ErrorStackProps = {
  stack: string;
};

const ErrorStack: VoidFunctionComponent<ErrorStackProps> = ({ stack }): JSX.Element => {
  const lines = stack.trim().split(/\n+/);

  return (
    <code className={styles.stack}>
      {lines.map(line => (
        <span key={line} className={styles.line}>
          {line}
        </span>
      ))}
    </code>
  );
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
        <div className={styles.errorBoundary}>
          <h1>☠ There has been an error</h1>
          <dl className={styles.errorDetails}>
            <dt>URL</dt>
            <dd>
              <a href={document.location.href}>{document.location.href}</a>
            </dd>
            <dt>Error name</dt>
            <dd>{this.state.error.name}</dd>
            <dt>Error message</dt>
            <dd>{this.state.error.message}</dd>
            {this.state.error.stack && (
              <Fragment>
                <dt>Stack</dt>
                <dd>
                  <ErrorStack stack={this.state.error.stack} />
                </dd>
              </Fragment>
            )}
          </dl>
        </div>
      );
    }

    return this.props.children;
  }
}
