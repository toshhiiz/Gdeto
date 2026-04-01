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
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Что-то пошло не так</h1>
            <p className="text-gray-600 mb-6">
              Произошла непредвиденная ошибка. Пожалуйста, обновите страницу.
            </p>
            <details className="text-left mb-6 bg-red-50 p-4 rounded border border-red-200">
              <summary className="font-semibold text-red-700 cursor-pointer">
                Детали ошибки
              </summary>
              <pre className="mt-2 text-sm text-red-600 overflow-auto">
                {this.state.error?.toString()}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
