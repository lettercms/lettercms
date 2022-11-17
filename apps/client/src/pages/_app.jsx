import {useRouter} from 'next/router';
import Fallback from '@/components/fallback';
import '@/styles/global.css';
import Footer from '@/components/footer';
/*import {useEffect, useState} from 'react';
import Head from 'next/head';
import sdk from '@lettercms/sdk';
import Cookies from 'js-cookie';
import {UserProvider} from '@/lib/userContext';
import Facebook from '@/lib/client/FacebookSDK';
import Load from '@/components/loadBar';
import Nav from '@/components/nav';
import {ClientProvider} from '@/components/userContext';

//Sobreescribir el punto de acceso a la API, para usar la ultima version
//sdk.endpoint = 'https://lettercms-api-development.vercel.app';
sdk.endpoint = 'http://localhost:3009';

/**
 * Funcion que obtiene el token de acceso publico de la API de LetterCMS
 *
const renovateToken = async () => {
  const res = await fetch('/api/generate-token', {method: 'POST'});

  if (res.ok) {
    const {accessToken} = await res.json();
    
    //Añadir el token de acceso globalmente para el SDK
    sdk.setAccessToken(accessToken);
  } else {
    //si falla el obtener el token reintenta cada 10s
    setTimeout(renovateToken, 10000);
  }
}
*/
const CustomApp = ({pageProps, Component}) => {
  const router = useRouter();
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

  function setView() {
    if (!pageProps.accessToken || router.preview || pageProps.notFound)
      return;

    try {
      const {paths} = router.query;

      const url = paths?.[paths?.length - 1];

      sdk.stats.setView(url || '/', document.referrer);

    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];

    router.events.on('routeChangeStart', () => {
      html.style.scrollBehavior = '';

      setLoad(true);
    });

    router.events.on('routeChangeComplete', () => {
      window.scrollTo(0, 0);
      html.style.scrollBehavior = 'smooth';

      setLoad(false);
    });
  }, []);
*/
  if (router.isFallback)
    return <Fallback/>;

  return <>
    <Component {...pageProps}/>
    <Footer/>
  </>
  
  /*return <div>
    <Head>
      {
        pageProps?.next
        && <link rel="next" />
      }
      {
        pageProps?.prev
        && <link rel="prev" />
      }
    </Head>
    {
      showLoad
      && <Load />
    }
    <Nav subdomain={router.query.subdomain} main={pageProps.mainUrl}/>
    <ClientProvider ready={!router.isFallback}>
      <Component {...pageProps} />
    </ClientProvider>
  </div>;*/
};

export default CustomApp;
