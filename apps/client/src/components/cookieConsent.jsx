import Cookie from 'js-cookie';

const setCookie = (accept, cb) => {
  Cookie.set('__lettercms_cookie_consent', accept.toString());

  cb(accept);
};

export default function Consent({setConsent}) {
  return <div className='fixed w-full bg-main-500 bottom-0 left-0 px-2 py-4 shadow shadow-1 shadow-gray md:px-12'>
    <div className='my-4 mx-2'>
      <span className='text-sm font-bold text-white'>Consentimiento del uso de Cookies</span>
    </div>
    <p className='mx-1 bg-white p-2 rounded-lg md:p-4'>Utilizamos cookies propias y de terceros para obtener datos estadísticos de la navegación de nuestros usuarios y mejorar nuestros servicios. Si acepta o continúa navegando, consideramos que acepta su uso. Puede cambiar la configuración u obtener más información aquí.</p>
    <div className='flex mt-4 justify-between md:justify-start'>
      <button className='bg-white text-main-500 rounded-full py-2 px-8 md:mr-4' onClick={() => setCookie(true, setConsent)}>Aceptar</button>
      <button className='bg-white text-main-500 rounded-full py-2 px-8' onClick={() => setCookie(false, setConsent)}>Rechazar</button>
    </div>
  </div>;
}