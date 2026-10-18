'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose?: () => void;
}

export function Toast({ message, type = 'success', duration = 4000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-emerald-50' : 'bg-red-50';
  const textColor = type === 'success' ? 'text-emerald-900' : 'text-red-900';
  const borderColor = type === 'success' ? 'border-emerald-200' : 'border-red-200';
  const icon = type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />;

  return (
    <div
      className={`fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm ${bgColor} ${textColor} ${borderColor} border rounded-lg p-4 shadow-lg z-[80] animate-in fade-in slide-in-from-bottom-2 duration-300`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">{icon}</div>
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-current hover:opacity-70 transition"
          aria-label="Tutup notifikasi"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
