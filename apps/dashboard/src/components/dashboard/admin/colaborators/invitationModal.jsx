import {useIntl, FormattedMessage} from 'react-intl';
import {useState, useEffect} from 'react';
import sdk from '@lettercms/sdk';
import ModalUser from './modalUser';
import Base from '@/components/modal';
import Button from '@/components/button';

export default function InvitationModal({onClose}) {
  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);

  const intl = useIntl();
  
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
        return alert(
          intl.formatMessage({
            id: 'Insert data'
          })
        );

      let res;
      if (data.role === 'collaborator') 
        res = await sdk.createRequest('/account/invitation', 'POST', {email, name, lastname});
      else if (data.role === 'single')
        res = await sdk.accounts.inviteSingle(email);

      if (res.status === 'OK')
        alert(
          intl.formatMessage({
            id: 'Invitation sent'
          })
        );

      if (res.status === 'account-exists')
        alert(
          intl.formatMessage({
            id: 'An account with that email already exists'
          })
        );
      
      setData({
        name: '',
        lastname: '',
        email: '',
        role: 'collaborator'
      });

      setSending(false);
      close();
    } catch(err) {
      alert(
        intl.formatMessage({
          id: 'Error sending invitation'
        })
      );

      throw err;
    }
  };

  return <Base show={showModal} close={close} width='auto' height='auto'>
    <div>
      <ModalUser onChange={handleInput} role={data.role} name={data.name} lastname={data.lastname} email={data.email}/>
      <Button loading={sending} type='solid' onClick={sendInvitation}>
        <FormattedMessage id='Send invitation'/>
      </Button>
    </div>
  </Base>;
}
