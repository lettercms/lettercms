import {useState} from 'react';
import Card from './invitationCard';
import User from './user';

const Invitation = ({invitationID, token}) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  return <div className='form'>
    {
      step === 1 &&
      <Card onAccept={() => setStep(2)} onGetEmail={e => setEmail(e)}/>
    }
    {
      step === 2 &&
      <User isCollab email={email}/>
    }
  </div>;
};

export default Invitation;
