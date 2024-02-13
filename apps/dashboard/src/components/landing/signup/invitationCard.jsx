//import {useState} from 'react';
import Input from '@/components/input';
import Button from '@/components/button';

export default function InvitationCard({onAccept, email, translation}) {
  //const [isLoading, setIsLoading] = useState(false);

  return <span style={{color: '#555', fontSize: '1rem'}}>
    <Input
      id='email'
      value={email}
      type='email'
      disabled
      label={translation['Invitation for']}
    />
    <Button type='outline' style={{width: '100%'}} onClick={onAccept}>
      {translation['Confirm']}
    </Button>
  </span>;
}
