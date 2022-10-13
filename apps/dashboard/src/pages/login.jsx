import Router from 'next/router';
import {Component} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Input from '@/components/input';
import Image from 'next/image';
import {signIn} from 'next-auth/react';
import NotSupported from '@/components/mobileNotSupported';

export async function getServerSideProps({req, res}) {
  const isMobile = /Android|iPhone|iPad/.test(req?.headers['user-agent'] || navigator.userAgent);

  return {
    props: {
      isMobile
    }
  };
}

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    isLoad: false
  };

  componentDidMount = () => {
    window._login = (email, password) => signIn('credentials', {
        redirect: false,
        email,
        password
      });
  }

  login = async e => {
    try {
      e.preventDefault();

      this.setState({
        isLoad: true
      });

      const inputs = e.target.getElementsByTagName('input');

      const email = inputs.email.value;
      const password = inputs.password.value;

      if (!email || !password)
        return alert('Ingrese los datos');

      const user = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if (user.ok)
        Router.push('/dashboard');
    } catch (err) {

      alert('Error on Login');
      throw err;
    } finally {
      this.setState({
        isLoad: false,
      });
    }
  }

  handleInput = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {isLoad, email, password} = this.state;
    const {isMobile} = this.props;

    if (isMobile)
      return <>
        <Head>
          <title>Login - LetterCMS</title>
        </Head>
        <NotSupported/>
      </>;

    return (
      <div id="container">
        <Head>
          <title>Login - LetterCMS</title>
        </Head>
        <div id='image'>
          <Image
            layout='fill'
            src={`${process.env.ASSETS_BASE}/images/lettercms-logo-white-standalone.png`}
            alt='LetterCMS Logo White'
            objectFit='contain'
          />
        </div>
        <div id='form-container'>
          <form onSubmit={this.login}>
            <Input disabled={isLoad} value={email} id='email' type='email' onInput={this.handleInput} label='Email'/>
            <Input disabled={isLoad} value={password} id='password' type="password" onInput={this.handleInput} label='Contraseña'/>

            {/*<Link href='#'><a className='forgot'>¿Olvidaste tu contraseña?</a></Link>*/}
            { isLoad
              ?
              <div style={{width: '2.75rem', height: '2.75rem', position: 'relative', margin: 'auto'}}>
                <Image layout='fill'
                  src={`${process.env.ASSETS_BASE}/assets/spinner-black.svg`}
                  alt='Spinner'
                  style={{
                    display: 'block', height: '2.75rem', margin: '15px auto', animation: 'rotation linear 1s infinite',
                  }}
                />
              </div>
              : <button className="black">Iniciar Sesión</button>
          }
          </form>
          <div id='register-cta'>
            <span>¿Aun no tienes cuenta? </span>
            <Link href='/signin'>
              <a>Regístrate</a>
            </Link>
          </div> 
        </div>
        <style jsx>{`
          #container {
            position: absolute;
            width: 100%;
            height: 100%;
            background: #5f4dee;
            overflow: auto;
          }
          #image {
            width: 10%;
            height: 146px;
            width: 126px;
            position: relative;
            margin: 100px auto 15px;
          }
          #form-container {
            width: 90%;
            max-width: 400px;
            margin: 50px auto 15px;
          }
          #form-container form {
            width: 100%;
            background: #f7f7f7;
            padding: 25px 5%;
            border-radius: 0.25rem;
            margin-bottom: 20px;
          }
          #form-container #register-cta {
            width: 100%;
          }
          #register-cta span,
          #register-cta a {
            color: white;
          }
          @keyframe rotation {
            from {
              transform: rotate(0deg)
            }
            to {
              transform: rotate(360deg)

            }
          }
          .ex-2-header {
            padding-top: 9rem;
            background-color: #5f4dee;
            text-align: center;
            min-height: 100vh;
          }

          .ex-2-header h1,
          .ex-2-header p {
            color: #fff;
          }

          .ex-2-header p {
            max-width: 24rem;
            margin-right: auto;
            margin-bottom: 2.5rem;
            margin-left: auto;
          }

          .ex-2-header .form-container {
            max-width: 26rem;
            margin-right: auto;
            margin-left: auto;
            padding: 2.25rem 1.25rem 1.25rem 1.25rem;
            border-radius: 0.5rem;
            background-color: #f3f7fd;
          }

          .ex-2-header .checkbox {
            text-align: left;
          }

          @media (min-width: 768px) {
            /* Sign Up And Log In Pages */
            .ex-2-header {
              padding-top: 11rem;
            }

            .ex-2-header .form-container {
              padding: 2.25rem 1.75rem 1.25rem 1.75rem;
            }
          }
        `}</style>
      </div>
    );
  }
}