import {useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import Input from '../input';
import {createAccount, createCollaborator} from '@lettercms/admin';
import Button from '@/components/button';

const resendEmail = async intl => {
  const token = localStorage.getItem('userToken');

  const data = JSON.parse(Buffer.from(token, 'hex').toString('utf-8'));

  try {
    const {status} = await createAccount(data);

    if (status === 'OK') {
      alert(
        intl.formatMessage({
          id: 'Email sent'
        })
      );
    } else {
      alert(
        intl.formatMessage({
          id: 'The verification mail couldn\'t be sent, try later'
        })
      );
    }
  } catch(err) {
    alert(
      intl.formatMessage({
        id: 'Error resending the verification email'
      })
    );

    throw err;
  }
};

export default function Verify({onVerify}) {
  const [code, setCode] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [isInvalidCode, setIsInvalidCode] = useState(false);

  const intl = useIntl();

  const verify = async () => {
    setIsLoad(true);
    setIsInvalidCode(false);

    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('userToken');

    const data = JSON.parse(Buffer.from(token, 'hex').toString('utf-8'));

    const res = await fetch('/api/account/verify', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        code
      })
    });

    const {status} = await res.json();

    if (status === 'OK') {
      localStorage.removeItem('userToken');
      localStorage.setItem('_step', 'blog');
      
      onVerify();
    } else {
      setIsInvalidCode(true);
    }

    setIsLoad(false);
  };

  return <div className='form'>
    <span style={{color: '#555', fontSize: '1rem'}}>
      <span>
        <FormattedMessage id='Insert the code sent to your email'/>
      </span>
      <Input
        status={isInvalidCode ? 'invalid' : null}
        id='code'
        value={code}
        onInput={({target: {value}}) => setCode(value)}
        label={
          intl.formatMessage({
            id: 'Verification code'
          })
        }
      />
      {
        isInvalidCode &&
        <div className='tooltip'>
          <span>
            <FormattedMessage id='Invalid Code'/>
          </span>
        </div>
      }
      <Button type='solid' loading={isLoad} onClick={verify}>
        <FormattedMessage id='Verify'/>
      </Button>
    </span>
    <hr/>
    <Button type='solid' loading={isLoad} onClick={() => resendEmail(intl)}>
      <FormattedMessage id='Resend code'/>
    </Button>
    <style jsx global>{`
      .form button {
        width: 100%;
      }
      .form .tooltip {
        margin-top: -1rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
      }
    `}</style>
  </div>;
}
