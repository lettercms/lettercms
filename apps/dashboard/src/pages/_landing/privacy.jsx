import Head from 'next/head';
import {Layout} from '@/components/landing/layout';
import {getSession} from 'next-auth/react';
import Container from '@/components/container';
import jwt from 'jsonwebtoken';



export default function Privacy({session, accessToken, referrer}) {
  return <Layout session={session} accessToken={accessToken} referrer={referrer}>
    <div className='bg-main-500 overflow-hidden'>
      <Head>
        <meta charSet="utf-8" />
        <title>Política de Privacidad | LetterCMS</title>
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
          <div className='text-justify px-2 md:px-8 lg:px-12'>
            <p className='my-4'><strong>POLÍTICA DE PRIVACIDAD</strong></p>
            <p>&nbsp;</p>
            <p>El presente Política de Privacidad establece los términos en que David&apos;s Devel usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.</p>
            <p className='my-4'><strong>Información que es recogida</strong></p>
            <p>Nuestro sitio web podrá recoger información personal por ejemplo: Nombre,&nbsp; información de contacto como&nbsp; su dirección de correo electrónica e información demográfica. Así mismo cuando sea necesario podrá ser requerida información específica para procesar algún pedido o realizar una entrega o facturación.</p>
            <p className='my-4'><strong>Uso de la información recogida</strong></p>
            <p>Nuestro sitio web emplea la información con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y servicios. &nbsp;Es posible que sean enviados correos electrónicos periódicamente a través de nuestro sitio con ofertas especiales, nuevos productos y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.</p>
            <p>David&apos;s Devel está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.</p>
            <p className='my-4'><strong>Cookies</strong></p>
            <p>Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies es que con ellas las web pueden reconocerte individualmente y por tanto brindarte el mejor servicio personalizado de su web.</p>
            <p>
              Nuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas y su frecuencia. Esta información es empleada únicamente para análisis estadístico y después la información se elimina de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo las cookies ayudan a proporcionar un mejor servicio de los sitios web, estás no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione directamente,
              <a href="https://lettercms.vercel.app" target="_blank" rel='noreferrer'>visitas a una web </a>
              . Usted puede aceptar o negar el uso de cookies, sin embargo la mayoría de navegadores aceptan cookies automáticamente pues sirve para tener un mejor servicio web. También usted puede cambiar la configuración de su ordenador para declinar las cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros servicios.
            </p>
            <p className='my-4'><strong>Enlaces a Terceros</strong></p>
            <p>Este sitio web pudiera contener enlaces a otros sitios que pudieran ser de su interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.</p>
            <p className='my-4'><strong>Control de su información personal</strong></p>
            <p>En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro sitio web.&nbsp; Cada vez que se le solicite rellenar un formulario, como el de alta de usuario, puede marcar o desmarcar la opción de recibir información por correo electrónico. &nbsp;En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.</p>
            <p>Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con un orden judicial.</p>
            <p>David&apos;s Devel Se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.</p>
          </div>
        </Container>
      </div>
    </div>
  </Layout>;
}

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
