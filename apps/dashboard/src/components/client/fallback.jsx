import Head from 'next/head';

export default function Fallback() {
  return <div id='fallback'>
    <Head>
      <meta charSet="utf-8" />
      <title>Cargando...</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel= "icon" href="/favicon.ico" />
    </Head>
    <div/>
    <div id='image-container'>
      <img src={`${process.env.ASSETS_BASE}/illustrations/64.svg`}/>
      <span>Cargando</span>
    </div>
    <div/>
    <style jsx>{`
      #fallback {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background: white;
      }
      #fallback img {
        width: 80%;
        max-width: 40rem;
      }
      #image-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `}</style>
  </div>;
}
