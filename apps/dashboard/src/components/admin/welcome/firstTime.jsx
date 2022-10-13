import {useEffect} from 'react';
import {useUser} from '@/lib/dashboardContext';
import sdk from '@lettercms/sdk';
import Link from 'next/link';

const FirstTime = ({name, id}) =>  {
  useEffect(() => {
    sdk.accounts.update(id, {firstTime: false});
  }, [id]);

  return <div id='first-time-main'>
    <div id='welcome-title'>
      <span>Bienvenido <span>{name}</span></span>
      <p>Estamos felices que nos hayas elegido</p>
    </div>
    <img src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/welcome.svg' alt='LetterCMS - Welcome'/>
    <div id='welcome-links'>
      <div>
        <span>Visita nuestra</span>
        <a href='#'>Guia de Usuario</a>
      </div>
      <div>
        <span>Lee nuestros</span>
        <Link href='/terms'>
          <a>Terminos de Uso</a>
        </Link>
      </div>
      <div>
        <span>Cuentanos tus inquietudes en</span>
        <a href='https://www.facebook.com/davidsdevel'>Facebook</a>
      </div>
    </div>
    <style jsx>{`
      #first-time-main {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        height: 100%;
      }
      img {
        margin: -100px auto;
      }
      #welcome-title,
      p {
        text-align: center;
      }
      #welcome-title {
        padding: 25px 0;
        margin: 3rem 0 0;
      }
      #welcome-title span {
        font-weight: bold;
        font-size: 54px;
        color: #888;
      }
      #welcome-title span span {
        color: #31446c;
      }
      #welcome-links {
        display: flex;
        justify-content: space-around;
      }
      #welcome-links div {
        display: flex;
        flex-direction: column;
        border-left: 15px solid #5f4dee;
        border-radius: 10px;
        padding: 15px 10px;
      }
      #welcome-links div span {
        margin: 0 0 10px 0;
      }
    `}</style>
  </div>;
};

export default FirstTime;
