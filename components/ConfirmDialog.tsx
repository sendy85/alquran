'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  bookmarkCount?: number;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDangerous?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  bookmarkCount,
  cancelLabel = 'Batal',
  confirmLabel = 'Ya, Hapus Semua',
  onCancel,
  onConfirm,
  isDangerous = false,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };

    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    setTimeout(() => cancelButtonRef.current?.focus(), 0);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [isOpen, onCancel]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog container */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-[480px] bg-surface rounded-2xl shadow-xl p-6 border border-border-subtle max-h-[85dvh] flex flex-col"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="confirm-title" className="text-xl font-bold text-text-primary">
            {title}
          </h2>
          <button
            onClick={onCancel}
            className="p-1 text-text-secondary hover:text-text-primary transition rounded-full hover:bg-surface-container-low"
            aria-label="Tutup dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div id="confirm-message" className="mb-6 flex-1 overflow-y-auto">
          <p className="text-text-secondary leading-relaxed text-sm">
            {message}
          </p>
          {bookmarkCount !== undefined && bookmarkCount > 0 && (
            <p className="text-text-tertiary text-xs mt-3">
              Termasuk {bookmarkCount} penanda ayat.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onConfirm}
            className="w-full py-3 rounded-lg font-medium text-sm transition text-white"
            style={{ backgroundColor: 'var(--danger)' }}
          >
            {confirmLabel}
          </button>
          <button
            ref={cancelButtonRef}
            onClick={onCancel}
            className="w-full py-3 rounded-lg font-medium text-sm transition bg-surface-container-low text-text-primary border border-border-subtle"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
