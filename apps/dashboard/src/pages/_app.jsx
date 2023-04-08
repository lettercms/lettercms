import { SessionProvider } from 'next-auth/react';
import {useState, useEffect} from 'react';
import Router from 'next/router';
import { Toaster } from 'react-hot-toast';
import {IntlProvider} from 'react-intl';
import {createFirebaseApp} from '@/firebase/client';
import '@/styles/global.css';

export default function App({Component, pageProps: { messages, session, ...pageProps }}) {
  const [showLoad, setLoad] = useState(false);
  const router = Router.useRouter();

  const {hl} = router.query;

  useEffect(() => {
    window.alert = msg => toast(msg);

    Facebook.init();
    createFirebaseApp();
  }, []);

  const getLayout = Component.getLayout || (page => page);

    return <IntlProvider 
      locale={hl || 'en'}
      messages={messages}
      defaultLocale={hl || 'en'}
      onError={err => {
        throw err;
      }}
    >
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />, pageProps.user)}
    </SessionProvider>
    <Toaster />
  </IntlProvider>;
}
