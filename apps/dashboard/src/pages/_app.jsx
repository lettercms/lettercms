import { SessionProvider } from 'next-auth/react';
import {/*useState, */useEffect} from 'react';
import Router from 'next/router';
import sdk from '@lettercms/sdk';
import toast, { Toaster } from 'react-hot-toast';
import {IntlProvider} from 'react-intl';
import {createFirebaseApp} from '@/firebase/client';
import Facebook from '@/lib/client/FacebookSDK';
import '@/styles/global.css';

const isDev = process.env.NODE_ENV !== 'production';

if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production')
  sdk.endpoint = `http${isDev ? '' : 's'}://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/_public`;

export default function App({Component, pageProps: { messages, session, ...pageProps }}) {
  //TODO: Add load on page change
  //const [showLoad, setLoad] = useState(false);
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
