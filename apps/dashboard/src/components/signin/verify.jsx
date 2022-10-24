import {useState} from 'react';
import Input from '../input';
import {createAccount, createCollaborator} from '@lettercms/admin';

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
  const [code, setCode] = useState();

  const verify = async () => {
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
      alert('Código no valido');
    }
  };

  return <div className='form'>
    <span style={{color: '#555', fontSize: '1rem'}}>
      <span>Ingresa el código recibido por correo</span>
      <Input id='code' value={code} onInput={({target: {value}}) => setCode(value)} label='Código de verificación'/>
      <button className='btn-outline-lg' onClick={verify}>Verificar</button>
    </span>
    <hr/>
    <button className='btn-outline-lg' onClick={resendEmail}>Reenviar Correo</button>
  </div>;
}
