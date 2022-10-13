import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';
import Facebook from '../lib/client/FacebookSDK';
import { SessionProvider } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import Load from '../components/loadBar';
import '@/styles/global.css';

//Dynamics
const Nav = dynamic(() => import('../components/nav'));

export default function App({Component, pageProps: { session, ...pageProps }}) {
  const [showLoad, setLoad] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    window.alert = msg => toast(msg);

    Facebook.init();

    router.events.on('routeChangeStart', () => {
      html.style.scrollBehavior = '';

      setLoad(true);
    });

    router.events.on('routeChangeComplete', () => {
      Facebook.init();

      window.scrollTo(0, 0);
      html.style.scrollBehavior = 'smooth';

      setLoad(false);
    });

  }, []);

  const getLayout = Component.getLayout || ((page) => page);

    return (
      <div>
        {
          (showLoad && !pageProps.hideLayout)
          && <Load />
        }
        {
          (!router.asPath.startsWith('/dashboard')
          && !Component.hideMenu)
          && <Nav />
        }
        <SessionProvider session={session}>
          {getLayout(<Component {...pageProps} />, pageProps.user)}
        </SessionProvider>
        <Toaster />
      </div>
    );
}
