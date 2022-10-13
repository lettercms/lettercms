import Head from 'next/head';
import Link from 'next/link';

function ErrorPage(props) {
  const title = props.title ? props.title : 'Ups. Lo sentimos';
  const href = props.href ? props.href : '/';

  return <div>
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div id="container">
      <img alt='' src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/404.svg" />
      <div>
        <p>Ups. No hay nada por aqui</p>
        <span>
          ¿Te perdiste? Bueno dejame llevarte hasta el
          <Link href={href}><a> Inicio</a></Link>
        </span>
      </div>
    </div>
    <style jsx>{`
      * {
        margin: 0;
        padding: 0;
      }
      #container {
        text-align: center;
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        background: #f7f7f7;
      }
      #container img {
        max-width: 400px;
      }
  `}</style>
  </div>
};

export default ErrorPage;
