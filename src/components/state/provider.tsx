'use client';

import {
  createContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';

export interface StateContextValue {
  isOpen: (key: string) => boolean;
  setOpen: (key: string, value: boolean) => void;
  toggle: (key: string) => void;
}

export const StateContext = createContext<StateContextValue | null>(null);

let state: Record<string, boolean> = {};
let listeners: Array<() => void> = [];

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function getState(): Record<string, boolean> {
  return state;
}

function getServerSnapshot(): Record<string, boolean> {
  return {};
}

function setState(next: Record<string, boolean>) {
  state = next;
  emitChange();
}

export function StateProvider({ children }: { children: React.ReactNode }) {
  const current = useSyncExternalStore(subscribe, getState, getServerSnapshot);

  const isOpen = useCallback((key: string) => !!current[key], [current]);

  const setOpen = useCallback((key: string, value: boolean) => {
    if (!!state[key] === value) return;
    setState({ ...state, [key]: value });
  }, []);

  const toggle = useCallback((key: string) => {
    setState({ ...state, [key]: !state[key] });
  }, []);

  const value = useMemo(
    () => ({ isOpen, setOpen, toggle }),
    [isOpen, setOpen, toggle],
  );

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}
