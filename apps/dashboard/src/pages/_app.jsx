import {useState, useMemo, useEffect} from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Facebook from '../lib/client/FacebookSDK';
import { SessionProvider } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import Load from '../components/loadBar';
import {ClientProvider} from '@/lib/userContext'; 
import {IntlProvider} from 'react-intl';
import {createFirebaseApp} from '@/firebase/client';
import '@/styles/global.scss';

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
    createFirebaseApp();

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
