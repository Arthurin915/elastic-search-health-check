import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

export function usePersistedState<T>(
  localStorageKey: string,
  initialState: T,
): Response<T> {
  const [state, setState] = useState<T>(() => {
    const storageValue = localStorage.getItem(localStorageKey);

    if (storageValue) {
      return JSON.parse(storageValue) as T;
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [localStorageKey, state]);

  return [state, setState];
}