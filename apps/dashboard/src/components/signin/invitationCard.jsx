import {useState} from 'react';
import Input from '../input';

export default function InvitationCard({onAccept, email}) {
  return <span style={{color: '#555', fontSize: '1rem'}}>
    <Input id='email' value={email} type='email' disabled label='Invitacion para'/>
    <button className='btn-outline-lg' onClick={onAccept}>Confirmar</button>
  </span>;
}
