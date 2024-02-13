'use client'

import {createContext, useContext, useEffect, useState} from 'react';
import sdk from '@lettercms/sdk';
import Router from 'next/navigation';
import Consent from '@/components/client/cookieConsent';
import Cookie from 'js-cookie';


//Sobreescribir el punto de acceso a la API, para usar la ultima version
sdk.endpoint = process.env.NODE_ENV !== 'development' ? 'https://lettercms-api-development.vercel.app' : 'http://localhost:3009';

/**
 * Funcion que obtiene el token de acceso publico de la API de LetterCMS
 */
const renovateToken = async () => {
  const res = await fetch('/api/generate-token', {method: 'POST'});

  if (res.ok) {
    const {accessToken} = await res.json();
    
    //Añadir el token de acceso globalmente para el SDK
    sdk.setAccessToken(accessToken);

    return accessToken;
  } else {
    //si falla el obtener el token reintenta cada 10s
    setTimeout(renovateToken, 10000);
  }
};

const ClientContext = createContext();

export function getContext() {
  return ClientContext;
}

export function useToken() {
  const value = useContext(ClientContext);

  if (!value && process.env.NODE_ENV !== 'production') {
    throw new Error(
      '[lettercms]: `useUser` must be wrapped in a <ClientProvider />'
    );
  }

  return value;
}

export function ClientProvider({children}) {
  //TODO: Handle user loading
  const [loading, setLoading] = useState(true); //eslint-disable-line
  const [ready, setReady] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  //TODO: Handle cookie consent checking
  const [consent, setConsent] = useState(null); //eslint-disable-line
  const router = Router.useRouter();
  
  useEffect(() => {
    const hasConsent = Cookie.get('__lettercms_cookie_consent');

    if (!hasConsent) {
      setShowConsent(true);
    } else {
      setConsent(hasConsent === 'true' ? true : false);
    }
    //Obtiene el token de acceso al montar el componente, despues refresca el token cada 25min
    renovateToken()
      .then(() => setReady(true));

    const interval = setInterval(renovateToken, 25 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!router.preview && !router.notFound && ready) {
      try {
        const {paths} = router.query;

        const url = paths?.[paths?.length - 1];

        sdk.stats.setView(url || '/', document.referrer);

      } catch (err) {
        throw err;
      }
    }
  }, [router.asPath, router.preview, router.notFound, ready]);

  const status = loading ? {status: 'loading'} : {status: 'done'};

  return <ClientContext.Provider value={status}>
    {children}
    {
      showConsent &&
      <Consent setConsent={_consent => {
        setConsent(_consent);
        setShowConsent(false);
      }}/>
    }
  </ClientContext.Provider>;
}
