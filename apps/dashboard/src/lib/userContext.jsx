import {createContext, useContext, useEffect} from 'react';
import sdk from '@lettercms/sdk';

const ClientContext = createContext();

export function getContext() {
  return ClientContext;
}

export function useToken() {
  const value = useContext(ClientContext);

  if (!value && process.env.NODE_ENV !== 'production') {
    throw new Error(
      '[lettercms]: `useUser` must be wrapped in a <DashboardProvider />'
    );
  }

  return value;
}

export function ClientProvider({accessToken, children}) {
  
  useEffect(() => {
    if (accessToken)
      sdk.setAccessToken(accessToken);
  }, [accessToken]);

  return <ClientContext.Provider value={{accessToken}}>{children}</ClientContext.Provider>;
}