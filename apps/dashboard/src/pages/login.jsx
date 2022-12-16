import {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Input from '@/components/input';
import Button from '@/components/button';
import {signIn} from 'next-auth/react';
import Container from '@/components/credentialsContainer';
import styles from '@/styles/login.module.css';

export async function getServerSideProps({req, res}) {
  const isMobile = /Android|iPhone|iPad/.test(req?.headers['user-agent'] || navigator.userAgent);

  return {
    props: {
      isMobile
    }
  };
}

export default function Login({isMobile}) {
  const [isLoad, setIsLoad] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  
  const login = async e => {
    try {
      e.preventDefault();

      if (!email || !password)
        return alert('Ingrese los datos');

      setIsLoad(true);

      const user = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if (user.ok)
        router.push('/dashboard');
      else
        alert('Cuenta invalida');
    } catch (err) {

      alert('Error al iniciar sesión');
      throw err;
    } finally {
      setIsLoad(false);
    }
  };

  const cta = <div className={styles.cta}>
    <span>¿Aun no tienes cuenta? </span>
    <Link href='/signin'>
      <a>Regístrate</a>
    </Link>
  </div>;

  return <div>
    <Container isMobile={isMobile} title='Login' cta={cta}>
        <form onSubmit={login}>
          <Input disabled={isLoad} value={email} id='email' type='email' onInput={({target: {value}}) => setEmail(value) } label='Email'/>
          <Input disabled={isLoad} value={password} id='password' type="password" onInput={({target: {value}}) => setPassword(value) } label='Contraseña'/>

          {/*<Link href='#'><a className='forgot'>¿Olvidaste tu contraseña?</a></Link>*/}
          <Button type='solid' style={{width: '100%'}} loading={isLoad}>Iniciar Sesión</Button>
        </form>
    </Container>
  </div>;
}

