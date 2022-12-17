import {useState} from 'react';
import Input from '../input';
import {createAccount, createCollaborator} from '@lettercms/admin';
import Button from '@/components/button';

const resendEmail = async () => {
  const token = localStorage.getItem('userToken');

  const data = JSON.parse(Buffer.from(token, 'hex').toString('utf-8'));

  try {
    const {status} = await createAccount(data);

    if (status === 'OK') {
      alert('Correo enviado');
    } else {
      alert('No se pudo reenviar el correo de verificacion, Intente mas tarde');
    }
  } catch(err) {
    alert('Error al reenviar el correo de verificacion');
    throw err;
  }
};

export default function Verify({onVerify}) {
  const [code, setCode] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [isInvalidCode, setIsInvalidCode] = useState(false);

  const verify = async () => {
    setIsLoad(true);
    setIsInvalidCode(false);

    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('userToken');

    const data = JSON.parse(Buffer.from(token, 'hex').toString('utf-8'));

    const res = await fetch('/api/account/verify', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        code
      })
    });

    const {status} = await res.json();

    if (status === 'OK') {
      localStorage.removeItem('userToken');
      localStorage.setItem('_step', 'blog');
      
      onVerify();
    } else {
      setIsInvalidCode(true);
    }

    setIsLoad(false);
  };

  return <div className='form'>
    <span style={{color: '#555', fontSize: '1rem'}}>
      <span>Ingresa el código recibido por correo</span>
      <Input status={isInvalidCode ? 'invalid' : null} id='code' value={code} onInput={({target: {value}}) => setCode(value)} label='Código de verificación'/>
      {
        isInvalidCode &&
        <div className='tooltip'>
          <span>Código Invalido</span>
        </div>
      }
      <Button type='solid' loading={isLoad} onClick={verify}>Verificar</Button>
    </span>
    <hr/>
    <Button type='solid' loading={isLoad} onClick={resendEmail}>Reenviar Correo</Button>
    <style jsx global>{`
      .form button {
        width: 100%;
      }
      .form .tooltip {
        margin-top: -1rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
      }
    `}</style>
  </div>;
}
