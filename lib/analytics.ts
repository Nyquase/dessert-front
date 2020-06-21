import ReactGA from 'react-ga';

export const initGA = (): void => {
  // This ID is NOT a secret
  ReactGA.initialize('UA-155297229-2');
};

export const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const canonical = (u: string): string => `https://dessert.dev/${u}`;
