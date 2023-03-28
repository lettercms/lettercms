import {useState} from 'react';
import Card from './invitationCard';
import User from './user';

const Invitation = ({email}) => {
  const [step, setStep] = useState(1);

  return <div className='form'>
    {
      step === 1 &&
      <Card email={email} onAccept={() => setStep(2)}/>
    }
    {
      step === 2 &&
      <User isCollab email={email}/>
    }
  </div>;
};

export default Invitation;
