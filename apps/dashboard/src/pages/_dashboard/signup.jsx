import {useState, useEffect} from 'react';
import dynamic from 'next/dynamic';
import {getSession} from 'next-auth/react';
import Container from '@/components/dashboard/credentialsContainer';

const Verify = dynamic(import('@/components/dashboard/signin/verify'));
const BlogTab = dynamic(import('@/components/dashboard/signin/blog'));
const UserTab = dynamic(import('@/components/dashboard/signin/user'), {
  ssr: true
});

export async function getServerSideProps({req, query}) {
  const {invitationID, token, hl = 'en'} = query;

  if (invitationID) {
    return {
      props: {
        invitationID,
        token
      }
    };
  }

  const session = await getSession({req});

  if (session)
    return {
      redirect: {
        destination: '/dashboard',
        parmanent: false
      }
    };

  const lang = await import(`@/translations/signin/${hl}.json`);
  const messages = Object.assign({}, lang.default);

  return {
    props: {
      messages
    }
  };
}

export default function Signin() {
  const [tab, setTab] = useState('account');

  useEffect(() => {
    const step = localStorage.getItem('_step');

    if (step === 'blog')
      setTab('blog');
  }, []);

  const onUserCreate = () => setTab('verify');
  const onVerify = () => setTab('blog');
  const onVerifyError = () => setTab('account');
  
  return <Container title='Registrarse'>
    {
      tab === 'account' &&
      <UserTab onRegister={onUserCreate}/>
    }
    {
      tab === 'verify' &&
      <Verify onVerify={onVerify} onVerifyError={onVerifyError}/>
    }
    {
      tab === 'blog' &&
      <BlogTab />
    }
  </Container>;
}
