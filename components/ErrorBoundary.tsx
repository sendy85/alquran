'use client';

import React from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 text-sm text-red-500">
          Fitur sedang tidak tersedia. Coba muat ulang halaman.
          <button 
            className="block mt-2 underline" 
            onClick={() => this.setState({ hasError: false })}
          >
            Coba Lagi
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
