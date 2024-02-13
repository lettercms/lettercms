'use client'

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import sdk from '@lettercms/sdk';
import {createAccount, createCollaborator} from '@lettercms/admin';
import Input from '@/components/input';
import {useData} from '@/components/dashboard/credentialsContainer';
import {ImSpinner9} from 'react-icons/im';
import {signIn} from 'next-auth/react';
import Button from '@/components/button';

export default function UserTab({onRegister, email: emailProp, isCollab, translation}) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState(emailProp || '');
  const [password, setPassword] = useState('');
  const [existsEmail, setExistsEmail] = useState(null);
  const [emailLoad, setEmailLoad] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const {setUser} = useData();
  const router = useRouter();

  const validityEmail = async email => {
    const isValid = /\w*@[a-z]{1,10}\.[a-z]{2}/.test(email);

    if (isValid) {
      setEmailLoad(true);

      const exists = await sdk.Letter.existsAccount({email});
      
      setExistsEmail(exists);
      setEmailLoad(false);
    }
  };

  const handleInput = ({target: {name, value}}) => {
    setExistsEmail(null);

    if (name === 'name')
      setName(value);

    else if (name === 'lastname')
      setLastname(value);

    else if (name === 'email') {
      validityEmail(value);
      setEmail(value);
    }

    else if (name === 'password')
      setPassword(value);
  };

  const register = async e => {

    e.preventDefault();

    try {
      if (!name || !lastname || !password || !email)
        return alert(
          translation['Please fill all the fields']
        );

      setIsLoad(true);
      const opts = {
        name,
        lastname,
        password,
        email
      };

      const {status} = await createAccount({
        name,
        email
      });

      if (status !== 'OK') {
        return alert(
          translation['Error sending the data']
        );
      }

      setUser(opts);

      setIsLoad(false);
      onRegister(email);
    } catch(err) {
      alert(
        translation['Error registering user']
      );

      throw err;
    }
  };
  const createCollab = async e => {
    e.preventDefault();
    
    setIsLoad(true);

    await createCollaborator({
      name,
      lastname,
      email,
      password
    });

    const user = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    setIsLoad(false);

    if (user.ok)
      router.push('/dashboard');
  };
  
  let emailStatus = '';

  if (existsEmail === true)
    emailStatus = 'invalid';
  else if (existsEmail === false)
    emailStatus = 'valid' ;
  else
    emailStatus = 'loading';

  return <form className='form' onSubmit={!isCollab ? register : createCollab}>
    <div id='username' className='flex mb-4'>
      <Input
        disabled={isLoad}
        value={name}
        id='name'
        onInput={handleInput}
        label={translation['Name']}
        autoComplete='false'
      />
      <Input
        disabled={isLoad}
        value={lastname}
        id='lastname'
        onInput={handleInput}
        label={translation['Lastname']}
        autoComplete='false'
      />
    </div>
      {
        !isCollab &&
        <div id='emailLoad' className='flex flex-col relative'>
          <Input
            className='mb-4'
            status={emailStatus}
            disabled={isLoad}
            value={email}
            id='email'
            type='email'
            onInput={handleInput}
            label={translation['Email']}
            autoComplete='false'
          />
          {
            emailLoad && <ImSpinner9 className='w-6 h-6 animate-spin absolute right-4 top-[.9rem]'/>
          }
          {
            existsEmail === true &&
            <div className='tooltip'>
              <span>
                {translation['An account with that email already exists']}
              </span>
            </div>
          }
        </div>
      }
      <Input
        className='mb-4'
        disabled={isLoad}
        value={password}
        id='password'
        onInput={handleInput}
        label={
          translation['Password']
        }
        type='password'
        autoComplete='false'
      />
      <Button type='solid' style={{width: '100%'}}  loading={isLoad}>
        {translation['Register']}
      </Button>
    <style jsx>{`
      .tooltip {
        margin-top: -1rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
      }
    `}</style>
  </form>;
}
