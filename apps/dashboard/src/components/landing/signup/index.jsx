'use client'

import {useState, useEffect} from 'react';
import Container from '@/components/dashboard/credentialsContainer';
import Verify from './verify';
import BlogTab from './blog';
import UserTab from './user';

export default function Signin({translation}) {
  const [tab, setTab] = useState('account');

  useEffect(() => {
    const step = localStorage.getItem('_step');

    if (step === 'blog')
      setTab('blog');
  }, []);

  const onUserCreate = () => setTab('verify');
  const onVerify = () => setTab('blog');
  const onVerifyError = () => setTab('account');
  
  return <Container title={translation['Register']}>
    {
      tab === 'account' &&
      <UserTab translation={translation} onRegister={onUserCreate}/>
    }
    {
      tab === 'verify' &&
      <Verify translation={translation} onVerify={onVerify} onVerifyError={onVerifyError}/>
    }
    {
      tab === 'blog' &&
      <BlogTab translation={translation} />
    }
  </Container>;
}
