import {useState, useMemo, useEffect} from 'react';
import Script from 'next/script';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Facebook from '../lib/client/FacebookSDK';
import { SessionProvider } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import Load from '../components/loadBar';
import {ClientProvider} from '@/lib/userContext'; 
import {IntlProvider} from 'react-intl';
import '@/styles/global.scss';

const MEASUREMENT_ID= process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

//Dynamics
const Nav = dynamic(() => import('../components/nav'));

const initApp = setLoad => {
  const html = document.getElementsByTagName('html')[0];

  Router.events.on('routeChangeStart', () => {
    html.style.scrollBehavior = '';

    setLoad(true);
  });

  Router.events.on('routeChangeComplete', () => {
    Facebook.init();

    window.scrollTo(0, 0);
    html.style.scrollBehavior = 'smooth';

    window.gtag('config', MEASUREMENT_ID, {
      page_path: window.location.pathname
    });

    setLoad(false);
  });
};

export default function App({Component, pageProps: { messages, session, ...pageProps }}) {
  const [showLoad, setLoad] = useState(false);
  const router = Router.useRouter();

  const {hl} = router.query;

  useEffect(() => {
    window.alert = msg => toast(msg);

    Facebook.init();

    initApp(setLoad);
  }, []);

  const getLayout = Component.getLayout || (page => page);

    return (
      <div>
        <IntlProvider 
          locale={hl || 'en'}
          messages={messages}
          defaultLocale={hl || 'en'}
          onError={err => {
            throw err;
          }}
        >
          <ClientProvider accessToken={pageProps.accessToken}>
            <SessionProvider session={session}>
            <Script
              id='google-analytics'
              strategy='afterInteractive'
              dangerouslySetInnerHTML={{
                __html: `

                G-6VNC38JNFC

                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${MEASUREMENT_ID}' , {
                    page_path: window.location.pathname
                  });
                `
              }}
            />
              {
                (
                  showLoad &&
                  !pageProps.hideLayout
                ) &&
                <Load />
              }
              {
                (
                  !router.asPath.startsWith('/dashboard') &&
                  !Component.hideMenu
                ) &&
                <Nav />
              }
              {getLayout(<Component {...pageProps} />, pageProps.user)}
            </SessionProvider>
          </ClientProvider>
          <Toaster />
        </IntlProvider>
      </div>
    );
}
