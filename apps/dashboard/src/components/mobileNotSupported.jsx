import Image from 'next/image';
import Link from 'next/link';

const NotSupported = () => <div id='not-supported-container'>

  <div className='image-container'>
    <Image layout='fill' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/warn.png' alt='Warning'/>
  </div>
  <div id='text-container'>
    <span>Lo sentimos, nuestra app aun no funciona en dispositivos moviles. Ingrese desde su PC para disfrutar las mejores herramientas que te ofrecemos</span>
  </div>
  <Link href='/'><a className="btn-solid-lg">INICIO</a></Link>
  <style jsx>{`
    #not-supported-container {
      background:#5f4dee;
      height: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .image-container {
      width: 180px;
      height: 180px;
      margin: 0 auto 75px;
      position: relative;
    }
    #text-container {
      padding: 0 5%;
      font-size: 1.5rem;
      text-align: center;
      width: 90%;
      padding: 25px 5%;
      border-radius: 5px;
      background: white;
    }
    .btn-solid-lg {
      width: 90%;
      max-width: 360px;
      text-align: center;
      margin-top: 1.125rem;
      border-color: #f3f7fd;
      background-color: #f3f7fd;
      color: #5f4dee;
    }

    .btn-solid-lg:hover {
      background: transparent;
      color: #f3f7fd;
    }
  `}</style>
</div>;

export default NotSupported;
