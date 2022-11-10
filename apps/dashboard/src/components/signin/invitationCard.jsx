import {useState} from 'react';
import Input from '../input';
import Button from '../button';

export default function InvitationCard({onAccept, email}) {
  const [isLoading, setIsLoading] = useState(false);

  return <span style={{color: '#555', fontSize: '1rem'}}>
    <Input id='email' value={email} type='email' disabled label='Invitacion para'/>
    <Button type='outline' style={{width: '100%'}} onClick={onAccept}>Confirmar</Button>
  </span>;
}
