import {useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Input from '@/components/input';
import Button from '@/components/button';
import {signIn} from 'next-auth/react';
import Container from '@/components/credentialsContainer';
import styles from '@/styles/login.module.css';

export async function getServerSideProps({req, res, query}) {
  const {page, hl = 'en'} = query;
  const isMobile = /Android|iPhone|iPad/.test(req?.headers['user-agent'] || navigator.userAgent);

  const lang = await import(`@/translations/login/${hl}.json`);
  const messages = Object.assign({}, lang.default);

  return {
    props: {
      isMobile,
      messages
    }
  };
}

function CTA() {
  return <div className={styles.cta}>
    <span>
      <FormattedMessage id={`Don't you have an account yet? `}/>
    </span>
    <Link href='/signin'>
      <a>
        <FormattedMessage id='Register'/>
      </a>
    </Link>
  </div>;
}

export default function Login({isMobile}) {
  const [isLoad, setIsLoad] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const intl = useIntl();
  
  const login = async e => {
    try {
      e.preventDefault();

      if (!email || !password)
        return alert(intl.formatMessage({
          id: 'Insert data'
        }));

      setIsLoad(true);

      const user = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if (user.ok)
        router.push('/dashboard');
      else
        alert(intl.formatMessage({
          id: 'Invalid account'
        }));
    } catch (err) {

      alert(intl.formatMessage({
        id: 'Error on login'
      }));
      throw err;
    } finally {
      setIsLoad(false);
    }
  };

  return <div>
    <Container isMobile={isMobile} title='Login' cta={<CTA/>}>
      <form onSubmit={login}>
        <Input
          disabled={isLoad}
          value={email}
          id='email'
          type='email'
          onInput={({target: {value}}) => setEmail(value)}
          label={
            intl.formatMessage({
              id: 'Email'
            })
          }
        />
        <Input
          disabled={isLoad}
          value={password}
          id='password'
          type="password"
          onInput={({target: {value}}) => setPassword(value)}
          label={
            intl.formatMessage({
              id: 'Password'
            })
          }
        />
        {/*<Link href='#'><a className='forgot'>¿Olvidaste tu contraseña?</a></Link>*/}
        <Button type='solid' style={{width: '100%'}} loading={isLoad}>
          <FormattedMessage id='Log In'/>
        </Button>
      </form>
    </Container>
  </div>;
}

