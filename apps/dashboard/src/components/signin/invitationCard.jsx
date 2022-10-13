import {useState} from 'react';
import Input from '../input';

export default function InvitationCard({onAccept, onGetEmail}) {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [isLoad, setLoad] = useState(true);

  return <span style={{color: '#555', fontSize: '1rem'}}>
    <Input id='email' value='djgm1206@gmail.com' type='email' disabled label='Invitacion para'/>
    <button className='btn-outline-lg' onClick={onAccept}>Confirmar</button>
  </span>;
}
