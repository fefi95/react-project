import React from "react";

interface ErrorState {
  hasError: boolean;
}

interface ErrorProps {
  fallback: React.ReactElement;
  children: React.ReactElement;
}

class ErrorBoundary extends React.Component<ErrorProps, ErrorState, any> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any): ErrorState {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any): void {
    console.error(error, info.componentStack);
  }

  render(): React.ReactElement {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
