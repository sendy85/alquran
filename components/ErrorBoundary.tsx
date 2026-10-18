'use client';

import React from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (process.env.NODE_ENV !== 'production') {
        return (
          <div className="p-4 text-sm text-red-500 bg-red-50 rounded">
            <p className="font-bold">Error: {this.state.error?.message}</p>
            <button 
              className="block mt-2 underline" 
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Coba Lagi
            </button>
          </div>
        );
      }
      return this.props.fallback || (
        <div className="p-4 text-sm text-red-500">
          Fitur sedang tidak tersedia. Coba muat ulang halaman.
          <button 
            className="block mt-2 underline" 
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Coba Lagi
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
