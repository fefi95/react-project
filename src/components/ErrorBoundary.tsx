import React from "react";

interface ErrorState {
  hasError: boolean;
}

interface ErrorProps {
  fallback: React.ReactElement;
  children: React.ReactElement;
}

// React error boundaries require class components — no hooks-based alternative exists yet.
class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: unknown): ErrorState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo): void {
    console.error(error, info.componentStack);
  }

  render(): React.ReactElement {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
