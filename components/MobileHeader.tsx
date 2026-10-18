'use client';

import React from 'react';
import { HeaderControls } from './HeaderControls';

export function MobileHeader() {
  return (
    <div 
      className="md:hidden flex justify-end items-center px-4 h-[44px] bg-surface-container-lowest border-b border-border-subtle"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <HeaderControls />
    </div>
  );
}
