import Head from 'next/head';
import {Layout} from '@/components/landing/layout';
import {getSession} from 'next-auth/react';
import Container from '@/components/container';
import jwt from 'jsonwebtoken';

export async function getServerSideProps({req, res, query}) {
  const session = await getSession({req});
  const {hl = 'en'} = query;

  //TODO: Change to privacy translation
  const messages = await import(`@/translations/index/${hl}.json`);

  return {
    props: {
      messages: Object.assign({}, messages.default),
      accessToken: jwt.sign({subdomain: 'davidsdevel'}, process.env.JWT_AUTH),
      session
    }
  };
}

export default function Terms({session, accessToken, referrer}) {
  return <Layout session={session} accessToken={accessToken} referrer={referrer}>
    <div className='bg-main-500 overflow-hidden'>
      <Head>
        <meta charSet="utf-8" />
        <title>Terminos y condiciones de uso | LetterCMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <header className='py-24 max-w-7xl bg-white'>
          <div className='flex flex-col md:flex-row md:items-center'>
            <div className='w-80 flex flex-col items-center m-auto mb-12 md:mb-auto md:w-3/4'>
              <img src={`${process.env.ASSETS_BASE}/assets/lettercms-logo.svg`} className='h-12 md:mb-8' alt='LetterCMS logo white'/>
              <h1 className='text-4xl text-main-700 text-center'>Aseguramos tu privacidad</h1>
            </div>
            <div className='md:w-3/4'>
              <img src={`${process.env.ASSETS_BASE}/illustrations/99.svg`} className='desktop' alt='LetterCMS logo white'/>
            </div>
          </div>
        </header>
        <svg className="-mt-1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 310">
          <path fill='#fff' d="M0,283.054c22.75,12.98,53.1,15.2,70.635,14.808,92.115-2.077,238.3-79.9,354.895-79.938,59.97-.019,106.17,18.059,141.58,34,47.778,21.511,47.778,21.511,90,38.938,28.418,11.731,85.344,26.169,152.992,17.971,68.127-8.255,115.933-34.963,166.492-67.393,37.467-24.032,148.6-112.008,171.753-127.963,27.951-19.26,87.771-81.155,180.71-89.341,72.016-6.343,105.479,12.388,157.434,35.467,69.73,30.976,168.93,92.28,256.514,89.405,100.992-3.315,140.276-41.7,177-64.9V0.24H0V283.054Z"/>
        </svg>
      </div>
      {/*<Landing title="Porque también pensamos en tu privacidad" image='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/privacidad.jpg' />*/}
      <div>
        <Container className='bg-white m-auto max-w-5xl'>
          <div className='text-justify px-12'>
            <h2 style={{ textAlign: 'center' }}><strong>Términos y Condiciones de Uso</strong></h2>
            <p>&nbsp;</p>
            <p><strong>INFORMACIÓN RELEVANTE</strong></p>
            <p>Es requisito necesario para la adquisición de los productos que se ofrecen en este sitio,
              que lea y acepte los siguientes Términos y Condiciones que a continuación se redactan.
              El uso de nuestros servicios así como la compra de nuestros productos implicará 
              que usted ha leído y aceptado los Términos y Condiciones de Uso en el presente documento. 
              Todas los productos &nbsp;que son ofrecidos por nuestro sitio web pudieran ser creadas, 
              cobradas, enviadas o presentadas por una página web tercera y en tal caso estarían sujetas
               a sus propios Términos y Condiciones. 
               En algunos casos, para adquirir un producto, será necesario el registro por parte del 
               usuario, con ingreso de datos personales fidedignos y definición de una contraseña.
            </p>
            <p>El usuario puede elegir y cambiar la clave para su acceso de administración de la cuenta en cualquier momento, en caso de que se haya registrado y que sea necesario para la compra de alguno de nuestros productos. https://www.davidsdevel.com no asume la responsabilidad en caso de que entregue dicha clave a terceros.</p>
            <p>Todas las compras y transacciones que se lleven a cabo por medio de este sitio web, están sujetas a un proceso de confirmación y verificación, el cual podría incluir la verificación del stock y disponibilidad de producto, validación de la forma de pago, validación de la factura (en caso de existir) y el cumplimiento de las condiciones requeridas por el medio de pago seleccionado. En algunos casos puede que se requiera una verificación por medio de correo electrónico.</p>
            <p>Los precios de los productos ofrecidos en esta Tienda Online es válido solamente en las compras realizadas en este sitio web.</p>
            <p>
              <strong>LICENCIA</strong>
            </p>
            <p>David&apos;s Devel&nbsp; a través de su sitio web concede una licencia para que los 
              usuarios utilicen&nbsp; los productos que son vendidos en este sitio web de acuerdo a 
              los Términos y Condiciones que se describen en este documento.
            </p>
            <p>
              <strong>USO NO AUTORIZADO</strong>
            </p>
            <p>En caso de que aplique (para venta de software, templetes, u otro producto de diseño y 
              programación) usted no puede colocar uno de nuestros productos, 
              modificado o sin modificar, en un CD, sitio web o ningún otro medio y 
              ofrecerlos para la redistribución o la reventa de ningún tipo.
            </p>
            <p>
              <strong>PROPIEDAD</strong>
            </p>
            <p>Usted no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros productos,
               modificado o sin modificar. 
               Todos los productos son propiedad &nbsp;de los proveedores del contenido. 
               En caso de que no se especifique lo contrario, nuestros productos se proporcionan&nbsp; 
               sin ningún tipo de garantía, expresa o implícita. En ningún esta compañía será 
               &nbsp;responsables de ningún daño incluyendo, pero no limitado a, daños directos, 
               indirectos, especiales, fortuitos o consecuentes u otras pérdidas resultantes del 
               uso o de la imposibilidad de utilizar nuestros productos.
            </p>
            <p>
              <strong>POLÍTICA DE REEMBOLSO Y GARANTÍA</strong>
            </p>
            <p>En el caso de productos que sean&nbsp; mercancías irrevocables no-tangibles, 
              no realizamos reembolsos después de que se envíe el producto, 
              usted tiene la responsabilidad de entender antes de comprarlo. 
              &nbsp;Le pedimos que lea cuidadosamente antes de comprarlo. 
              Hacemos solamente excepciones con esta regla cuando la 
              descripción no se ajusta al producto. 
              Hay algunos productos que pudieran tener garantía y posibilidad de reembolso pero este 
              será especificado al comprar el producto. En tales casos la garantía solo cubrirá fallas 
              de fábrica y sólo se hará efectiva cuando el producto se haya usado correctamente. 
              La garantía no cubre averías o daños ocasionados por uso indebido. 
              Los términos de la garantía están asociados a fallas de fabricación y funcionamiento en 
              condiciones normales de los productos y sólo se harán efectivos estos términos si el 
              equipo ha sido usado correctamente. 
              Esto incluye:
            </p>
            <p>
              – De acuerdo a las especificaciones técnicas indicadas para cada producto.
              <br />
              – En condiciones ambientales acorde con las especificaciones indicadas por el fabricante.
              <br />
              – En uso específico para la función con que fue diseñado de fábrica.
              <br />
              – En condiciones de operación eléctricas acorde con las especificaciones y 
              tolerancias indicadas.
            </p>
            <p><strong>COMPROBACIÓN ANTIFRAUDE</strong></p>
            <p>La compra del cliente puede ser aplazada para la comprobación antifraude. 
              También puede ser suspendida por más tiempo para una investigación más rigurosa, 
              para evitar transacciones fraudulentas.
            </p>
            <p>
              <strong>PRIVACIDAD</strong>
            </p>
            <p>
              Este
              <a href=" https://www.davidsdevel.com" target="_blank">sitio web</a>
              {' '}
              https://www.davidsdevel.com garantiza que la información personal que usted envía cuenta 
              con la seguridad necesaria. Los datos ingresados por usuario o en el caso de requerir 
              una validación de los pedidos no serán entregados a terceros, salvo que deba ser revelada 
              en cumplimiento a una orden judicial o requerimientos legales.
            </p>
            <p>La suscripción a boletines de correos electrónicos publicitarios es voluntaria 
              y podría ser seleccionada al momento de crear su cuenta.
            </p>
            <p>David&apos;s Devel reserva los derechos de cambiar o de modificar estos términos sin 
              previo aviso.
            </p>
          </div>
        </Container>
      </div>
    </div>
  </Layout>;
}

