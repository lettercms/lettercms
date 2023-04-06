//import {useEffect, useState} from 'react';
//import {useRouter} from 'next/router';
//import Fallback from '@/components/fallback';
//import Footer from '@/components/footer';
//import Nav from '@/components/nav';
//import {ClientProvider} from '@/components/userContext';
//import '@/styles/global.css';

/*
import Head from 'next/head';
import Cookies from 'js-cookie';
import Facebook from '@/lib/client/FacebookSDK';
import Load from '@/components/loadBar';
*/

const CustomApp = ({pageProps, Component}) => {
  //const router = useRouter();
/*
  const [showLoad, setLoad] = useState(false);
  const [tracingInit, setTracing] = useState(false);

  useEffect(() => {
    if (pageProps.accessToken && !router.isFallback) {

      sdk.setAccessToken(pageProps.accessToken);
      
      if (!pageProps.notFound) {
        setView();

        const UID = Cookies.get('userID');
        if (!UID) {
          sdk.createRequest('/user','POST', {
            device: /Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop'
          }).then(({id}) => {
            Cookies.set('userID', id);
          });
        }

      }
      if (!pageProps.notFound && !tracingInit) {
        sdk.stats.startTrace();
        setTracing(true);
      }
    }
  }, [pageProps.accessToken, router.isFallback]);

*/
  //if (router.isFallback)
  //  return <Fallback/>;

  /*return <>
    <Nav/>
    <ClientProvider>
      <Component {...pageProps} />
    </ClientProvider>
    <Footer/>
  </>;
  */

  return <Component/>
};

export default CustomApp;
