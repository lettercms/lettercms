'use client'

import {useState} from 'react';
import Input from '@/components/input';
import {createAccount} from '@lettercms/admin';
import Button from '@/components/button';
import {useData} from '@/components/dashboard/credentialsContainer';

const resendEmail = async translation => {
  const token = localStorage.getItem('userToken');

  const data = JSON.parse(Buffer.from(token, 'hex').toString('utf-8'));

  try {
    const {status} = await createAccount(data);

    if (status === 'OK') {
      alert(
        translation['Email sent']
      );
    } else {
      alert(
        translation['The verification mail couldn\'t be sent, try later']
      );
    }
  } catch(err) {
    alert(
      translation['Error resending the verification email']
    );

    throw err;
  }
};

export default function Verify({onVerify, translation}) {
  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [code, setCode] = useState('');

  const {user} = useData();

  const verify = async () => {
    setIsLoad(true);
    setIsInvalidCode(false);

    const res = await fetch('/api/account/verify', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...user,
        code
      })
    });

    const {status} = await res.json();

    if (status === 'OK') {
      localStorage.setItem('_step', 'blog');
      localStorage.setItem('_email', user.email);

      onVerify();
    } else {
      setIsInvalidCode(true);
    }

    setIsLoad(false);
  };

  return <div className='form'>
    <span style={{color: '#555', fontSize: '1rem'}}>
      <span>
        {translation['Insert the code sent to your email']}
      </span>
      <Input
        status={isInvalidCode ? 'invalid' : null}
        id='code'
        value={code}
        onInput={({target: {value}}) => setCode(value)}
        label={
          translation['Verification code']
        }
      />
      {
        isInvalidCode &&
        <div className='tooltip'>
          <span>
            {translation['Invalid Code']}
          </span>
        </div>
      }
      <Button type='solid' loading={isLoad} onClick={verify}>
        {translation['Verify']}
      </Button>
    </span>
    <hr/>
    <Button type='solid' loading={isLoad} onClick={() => resendEmail(translation)}>
      {translation['Resend code']}
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
