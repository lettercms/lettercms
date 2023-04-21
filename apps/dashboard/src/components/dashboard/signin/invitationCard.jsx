import {FormattedMessage, useIntl} from 'react-intl';
//import {useState} from 'react';
import Input from '@/components/input';
import Button from '@/components/button';

export default function InvitationCard({onAccept, email}) {
  //const [isLoading, setIsLoading] = useState(false);

  const intl = useIntl();

  return <span style={{color: '#555', fontSize: '1rem'}}>
    <Input
      id='email'
      value={email}
      type='email'
      disabled
      label={
        intl.formatMessage({
          id: 'Invitation for'
        })
      }
    />
    <Button type='outline' style={{width: '100%'}} onClick={onAccept}>
      <FormattedMessage id='Confirm'/>
    </Button>
  </span>;
}
