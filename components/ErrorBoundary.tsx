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
    if (this.hasError) {
      return this.props.fallback || <div className="p-4 text-sm text-danger">Fitur sedang tidak tersedia. Coba muat ulang halaman.</div>;
    }
    return this.props.children;
  }
}
