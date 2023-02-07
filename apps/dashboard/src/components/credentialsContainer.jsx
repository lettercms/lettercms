import Head from 'next/head';
import Image from 'next/image';
import NotSupported from '@/components/mobileNotSupported';
import styles from './credentialsContainer.module.css';

export default function Credentials({title, children, cta}) {
  return <div className={styles.container}>
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
}