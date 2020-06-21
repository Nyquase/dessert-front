import { useEffect, RefObject } from 'react';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const useOutsideClick = (ref: RefObject<any>, callback: (() => void)): void => {
  // Event is certainly a bit too wide
  const handleClick = (e: Event): void => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect((): (() => void) => {
    document.addEventListener('click', handleClick);
    return (): void => document.removeEventListener('click', handleClick);
  });
};

export default useOutsideClick;
