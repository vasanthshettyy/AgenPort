import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-canvas border border-red-500/20 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-400">
            !
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Module Failed to Load</h3>
          <p className="text-gray-400 text-sm">A temporary error occurred while rendering this section.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
          >
            Retry Module
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
