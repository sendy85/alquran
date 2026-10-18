
export {};

declare global {
  interface Window {
    __installPrompt: any;
    __installPromptListeners: ((type: 'ready' | 'installed') => void)[];
  }
}
