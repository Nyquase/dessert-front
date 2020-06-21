import { useQuery } from '@apollo/react-hooks';
import { createContext, useState } from 'react';

import GET_USER from '../../graphql/getConnecterUser';
import PATHS from '../../lib/paths';
import { User } from '../../types/User';

// Holds value that are interesting to get through the whole application
// as this context is injected at the root of the DOM
// Holds the current user profile, thus the login status

export interface GlobalContextInterface {
  activePath: PATHS;
  setActivePath: (activePath: PATHS) => void;
  user?: User;
}

const defaultValue = null as unknown as GlobalContextInterface;

const ctxt = createContext<GlobalContextInterface>(defaultValue);

interface Props {
  children: React.ReactNode;
}

const GlobalContextProviderImpl = ({ children }: Props): JSX.Element => {
  const [ activePath, setActivePath ] = useState(PATHS.UNKNOWN);
  const { loading, error, data } = useQuery(GET_USER);

  let fetchedUser;
  if (!loading && !error && data) {
    fetchedUser = data.me;
  }

  return (
    <ctxt.Provider
      value={{
        activePath,
        setActivePath,
        user: fetchedUser,
      }}
    >
      { children }
    </ctxt.Provider>
  );
};

export const GlobalContextProvider = GlobalContextProviderImpl;

export default ctxt;
