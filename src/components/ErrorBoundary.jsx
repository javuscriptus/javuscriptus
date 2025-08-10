import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: '#ff6666', padding: 16 }}>
          Что-то пошло не так внутри Canvas. Попробуйте перезагрузить страницу.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
