import {createContext, useContext, useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from './credentialsContainer.module.css';

const CredentialsContext = createContext();

export function useData() {
  const value = useContext(CredentialsContext);

  if (!value && process.env.NODE_ENV !== 'production') {
    throw new Error(
      '[lettercms]: `useData` must be wrapped in a <CredentialsProvider />'
    );
  }

  return value;
}

export default function CredentialsProvider({title, children, cta}) {
  const [user, setUser] = useState({});
  const [blog, setBlog] = useState({});

  const data = {
    user,
    blog,
    setUser,
    setBlog
  };

  return <CredentialsContext.Provider value={data}>
    <div className={styles.container}>
    <Head>
      <title>{`${title} - LetterCMS`}</title>
    </Head>
    <div className={styles.imageContainer}>
      <Image
        layout='fill'
        src={`${process.env.ASSETS_BASE}/assets/lettercms-logo-white.svg`}
        alt='LetterCMS Logo White'
        objectFit='contain'
      />
    </div>
    <div className={styles.formContainer}>
      {children}
    </div>
    {cta}
  </div>;
  </CredentialsContext.Provider>;
}
