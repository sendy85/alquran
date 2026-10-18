'use client';

import { useEffect, useRef, useCallback } from 'react';
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

  // Focus trap dan keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    // Focus awal ke tombol Batal
    setTimeout(() => {
      cancelButtonRef.current?.focus();
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = dialog.querySelectorAll(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    // Scroll lock di belakang
    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog container - responsif */}
      <div
        className="fixed inset-0 flex items-end md:items-center justify-center z-[70] p-0 md:p-4"
        role="presentation"
      >
        <div
          ref={dialogRef}
          className="w-full md:w-[480px] bg-surface-container-lowest rounded-t-2xl md:rounded-xl shadow-lg p-6 md:p-8 max-h-[85dvh] overflow-y-auto"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          aria-describedby="confirm-message"
        >
          {/* Header dengan tombol tutup (desktop) */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2
              id="confirm-title"
              className="text-xl md:text-2xl font-bold text-text-primary"
            >
              {title}
            </h2>
            <button
              onClick={onCancel}
              className="hidden md:flex items-center justify-center w-8 h-8 text-text-secondary hover:text-text-primary transition rounded-md hover:bg-surface"
              aria-label="Tutup dialog"
              tabIndex={0}
            >
              <X size={20} />
            </button>
          </div>

          {/* Isi pesan */}
          <div id="confirm-message" className="mb-6 md:mb-8">
            <p className="text-text-secondary leading-relaxed text-sm md:text-base">
              {message}
            </p>
            {bookmarkCount !== undefined && bookmarkCount > 0 && (
              <p className="text-text-tertiary text-xs md:text-sm mt-3">
                Termasuk {bookmarkCount} penanda ayat.
              </p>
            )}
          </div>

          {/* Tombol aksi */}
          <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-2 md:justify-end">
            <button
              ref={cancelButtonRef}
              onClick={onCancel}
              className="px-4 py-3 md:py-2 rounded-md font-medium text-sm transition bg-surface-container-low text-text-primary hover:bg-surface-container-lowest active:opacity-80"
              tabIndex={0}
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-3 md:py-2 rounded-md font-medium text-sm transition text-white"
              style={{
                backgroundColor: 'var(--danger)',
              }}
              onMouseDown={(e) => {
                // Prevent Enter key dari otomatis trigger saat dialog baru dibuka
                if (e.detail === 0) {
                  e.preventDefault();
                }
              }}
              tabIndex={0}
            >
              {confirmLabel}
            </button>
          </div>

          {/* Handle untuk bottom sheet di mobile */}
          <div className="md:hidden flex justify-center mt-4 mb-2">
            <div className="w-10 h-1 bg-border-subtle rounded-full" aria-hidden="true" />
          </div>
        </div>
      </div>
    </>
  );
}
