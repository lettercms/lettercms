'use client'

import {SessionProvider} from 'next-auth/react';
import {/*useState, */useEffect} from 'react';
import sdk from '@lettercms/sdk';
import toast, { Toaster } from 'react-hot-toast';
import {createFirebaseApp} from '@/firebase/client';
import Facebook from '@/lib/client/FacebookSDK';
import '@/styles/global.css';

const isDev = process.env.NODE_ENV !== 'production';

if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production')
  sdk.endpoint = `http${isDev ? '' : 's'}://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/_public`;

export default function MainLayout({children, session}) {
  //TODO: Add load on page change
  //const [showLoad, setLoad] = useState(false);

  useEffect(() => {
    window.alert = msg => toast(msg);

    Facebook.init();
    createFirebaseApp();
  }, []);


  return <>
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
    <Toaster />
  </>;
}
