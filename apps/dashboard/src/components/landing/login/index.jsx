'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/input';
import Button from '@/components/button';
import {signIn} from 'next-auth/react';
import Container from '@/components/dashboard/credentialsContainer';
import styles from '@/styles/login.module.css';

function CTA({translation}) {
  return <div className={styles.cta}>
    <span>
      {translation['Don\'t you have an account yet? ']}
    </span>
    <Link href='/signin'>
      {translation['Register']}
    </Link>
  </div>;
}

export default function Login({translation}) {
  const [isLoad, setIsLoad] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  
  const login = async e => {
    try {
      e.preventDefault();

      if (!email || !password)
        return alert(translation['Insert data']);

      setIsLoad(true);

      const user = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if (user.ok && !user.error)
        router.push('/dashboard');
      else
        alert(translation['Invalid account']);
    } catch (err) {

      alert(translation['Error on login']);
      throw err;
    } finally {
      setIsLoad(false);
    }
  };

  return <div>
    <Container title='Login' cta={<CTA translation={translation}/>}>
      <form onSubmit={login}>
        <Input
          className='mb-4'
          disabled={isLoad}
          value={email}
          id='email'
          type='email'
          onInput={({target: {value}}) => setEmail(value)}
          label={translation['Email']}
        />
        <Input
          className='mb-4'
          disabled={isLoad}
          value={password}
          id='password'
          type="password"
          onInput={({target: {value}}) => setPassword(value)}
          label={translation['Password']}
        />
        {/*<Link href='#'><a className='forgot'>¿Olvidaste tu contraseña?</a></Link>*/}
        <Button type='solid' style={{width: '100%'}} loading={isLoad}>
          {translation['Log In']}
        </Button>
      </form>
    </Container>
  </div>;
}
