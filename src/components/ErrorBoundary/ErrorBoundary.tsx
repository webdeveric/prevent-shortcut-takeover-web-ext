import { Component, type FunctionComponent, type ReactElement, type ReactNode } from 'react';

export type ErrorBoundaryProps = {
  children?: React.ReactNode;
};

export type ErrorBoundaryState = {
  error: Error | null;
};

export type ErrorStackProps = {
  stack: string;
};

const ErrorStack: FunctionComponent<ErrorStackProps> = ({ stack }): ReactElement => {
  const lines = stack.trim().split(/\n+/);

  return (
    <code className="block text-[0.8rem]">
      {lines.map((line, i) => (
        <span key={i} className="m-0 block">
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

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div className="p-3">
          <h1 className="border-b pb-4 text-2xl font-bold">☠ There has been an error</h1>
          <dl className="my-4 grid grid-cols-[auto_1fr] gap-4">
            <dt className="font-bold whitespace-nowrap">URL</dt>
            <dd className="m-0">
              <a href={document.location.href}>{document.location.href}</a>
            </dd>
            <dt className="font-bold whitespace-nowrap">Error name</dt>
            <dd className="m-0">{this.state.error.name}</dd>
            <dt className="font-bold whitespace-nowrap">Error message</dt>
            <dd className="m-0">{this.state.error.message}</dd>
            {this.state.error.stack && (
              <>
                <dt className="font-bold whitespace-nowrap">Stack</dt>
                <dd className="m-0 break-all">
                  <ErrorStack stack={this.state.error.stack} />
                </dd>
              </>
            )}
          </dl>
        </div>
      );
    }

    return this.props.children;
  }
}
