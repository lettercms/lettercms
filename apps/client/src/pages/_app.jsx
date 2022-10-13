import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import sdk from '@lettercms/sdk';
import Cookies from 'js-cookie';
import {UserProvider} from '@/lib/userContext';
import Facebook from '@/lib/client/FacebookSDK';
import Load from '@/components/loadBar';
import Nav from '@/components/nav';
import Footer from '@/components/index/footer';
import '@/styles/global.css';
import Fallback from '@/components/fallback';

const CustomApp = ({pageProps, Component}) => {
  const [showLoad, setLoad] = useState(false);
  const [tracingInit, setTracing] = useState(false);
  const router = useRouter();

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

  if (router.isFallback)
    return <Fallback/>;
  
  return <div>
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
    <UserProvider ready={pageProps.accessToken && !router.isFallback}>
      <Component {...pageProps} />
    </UserProvider>
    <Footer title={pageProps.blog?.title}/>
  </div>;
};

export default CustomApp;
