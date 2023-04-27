import {useEffect, createContext, useContext} from 'react';
//import {useRouter} from 'next/router';
import sdk from '@lettercms/sdk';
import Footer from './footer';
import Nav from './nav';

const ClientContext = createContext();

export function useToken() {
  const value = useContext(ClientContext);

  if (!value && process.env.NODE_ENV !== 'production') {
    throw new Error(
      '[lettercms]: `useToken` must be wrapped in a <Layout />'
    );
  }

  return value;
}

export function Layout({children, accessToken}) {
  //const router = useRouter();

  useEffect(() => {
    if (accessToken)
      sdk.setAccessToken(accessToken);
      //sdk.stats.setView(router.path, referrer);

  }, [accessToken]);

  return <ClientContext.Provider value={{accessToken}}>
    <Nav />
    {children}
    <Footer/>
  </ClientContext.Provider>;
}
