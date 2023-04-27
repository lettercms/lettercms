import {useState} from 'react';
import Modal from '@/components/modal';
import Input from '@/components/input';
import _sdk from '@lettercms/sdk';
import Cookie from 'js-cookie';
import Button from '@/components/button';

const sdk = new _sdk.Letter(process.env.TRACK_TOKEN);

const subscribe = async (_id, data, cb) => {
  try {
    if (!data.name || !data.lastname || !data.email)
      return alert('Debe colocar todos los datos');

    if (!_id)
      _id = Cookie.get('userID');

    const {status} = await sdk.createRequest(`/user/${_id}`, 'PATCH', {
      ...data,
      isSubscribe: true
    });

    if (status === 'OK')
      cb({
        _id,
        name: data.name,
        lastname: data.lastname,
        email: data.email
      });
    else
      alert('Error al suscribirse');
  } catch(err) {
    throw err;
    
    alert('Error al suscribirse');
  }
};

const Subscription = ({user, onSubscribe}) => {
  const [showModal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const data = {
    name,
    lastname,
    email
  };

  const cb = e => {
    onSubscribe(e);
    setModal(false);
  };

  return <div>
    <div className='sub-text'>
      <span className='sub-span'>¿Te ha gustado?</span>
      <br/>
      <span>Tenemos contenido de calidad esperando por ti</span>
    </div>
    <Button style={{width: '100%'}} type='outline' alt onClick={() => setModal(true)}>Suscribirse</Button>
    <Modal show={showModal} close={() => setModal(false)} width='auto' height='auto'>
      <form onSubmit={e => {e.preventDefault(); subscribe(user._id, data, cb);}}>
        <Input value={name} onInput={e => setName(e.target.value)} label='Nombre'/>
        <Input value={lastname} onInput={e => setLastname(e.target.value)} label='Apellido'/>
        <Input value={email} onInput={e => setEmail(e.target.value)} label='Email' type='email'/>
        <Button style={{width: '100%'}} type='outline'>Suscribirse</Button>
      </form>
    </Modal>
    <style jsx>{`
      .btn-outline-sm {
        width: 90%;
        max-width: 25rem;
        margin: 1rem auto 0;
        display: block !important;
      }
      .sub-text {
        text-align: center;
        padding: 2.5%;
      }
      .sub-text .sub-span {
        font-size: 2rem;
        display: block;
        font-weight: bold;
        margin-bottom: 2rem;
      }
    `}</style>
  </div>;
};

export default Subscription;
