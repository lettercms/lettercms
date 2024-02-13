import {useState, useEffect} from 'react';
import sdk from '@lettercms/sdk';
import Details from './details';
import Base from '@/components/modal';

export default function Collab({id, onClose}) {
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) {
      setShowModal(false);
      setTimeout(onClose, 600);
    }
  }, [showModal, onClose]);

  useEffect(() => {
    if (id) {
      sdk.accounts.single(id, [
        'name',
        'lastname',
        'ocupation',
        'description',
        'photo',
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'email'
      ])
      .then(e => {
        setUser(e);
        setShowModal(true);
      });
    }
  }, [id]);

  return <Base show={showModal} close={() => setShowModal(false)} width='auto' height='auto'>
    <Details {...user}/>
  </Base>;
}
