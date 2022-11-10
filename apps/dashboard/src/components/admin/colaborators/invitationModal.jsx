import {useState, useEffect} from 'react';
import sdk from '@lettercms/sdk';
import ModalUser from './modalUser';
import Base from '@/components/modalBase';
import Button from '@/components/button';

export default function InvitationModal({onClose}) {
  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);
  
  const [data, setData] = useState({
    name: '',
    lastname: '',
    email: '',
    role: 'collaborator'
  });

  useState(() => {
    setTimeout(() => setShowModal(true), 0);
  }, []);

  const close = () => {
    setShowModal(false);
    setTimeout(onClose, 600);
  };

  const handleInput = ({target}) => {
    const {name, value} = target;

    setData(e => ({
      ...e,
      [name]: value
    }));
  };

  const sendInvitation = async () => {
    setSending(true);
    try {
      const {email, name, lastname} = data;

      if (!email || !name || !lastname)
        return alert('Ingresa todo los datos');

      let res;
      if (data.role === 'collaborator') 
        res = await sdk.createRequest('/account/invitation', 'POST', {email, name, lastname});
      else if (data.role === 'single')
        res = await sdk.accounts.inviteSingle(email);

      if (res.status === 'OK')
        alert('Invitacion Enviada');

      if (res.status === 'account-exists')
        alert('Ya existe una cuenta con ese correo');
      
      setData({
        name: '',
        lastname: '',
        email: '',
        role: 'collaborator'
      });

      setSending(false);
      close();
    } catch(err) {
      alert('Error enviando invitacion');
      throw err;
    }
  };

  return <Base show={showModal} close={close} width='auto' height='auto'>
    <div>
      <ModalUser onChange={handleInput} role={data.role} name={data.name} lastname={data.lastname} email={data.email}/>
      <Button loading={sending} type='solid' onClick={sendInvitation}>Enviar Invitacion</Button>
    </div>
  </Base>;
}
