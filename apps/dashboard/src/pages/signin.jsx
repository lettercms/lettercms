import {Component} from 'react';
import dynamic from 'next/dynamic';
import Head from'next/head';
import asyncImport from '../lib/asyncImportScript';
import Image from 'next/image';
import {getSession} from 'next-auth/react';
import Cookie from 'js-cookie';
import Container from '@/components/credentialsContainer';


const BlogTab = dynamic(import('../components/signin/blog'));
const UserTab = dynamic(import('../components/signin/user'), {
  ssr: true
});
const Verify = dynamic(import('../components/signin/verify'));

export async function getServerSideProps({req, res, query}) {
  const {invitationID, token, hl = 'en'} = query;

  if (invitationID) {
    return {
      props: {
        invitationID,
        token
      }
    };
  }

  const session = await getSession({req});

  if (session)
    return {
      redirect: {
        destination: '/dashboard',
        parmanent: false
      }
    };

  const lang = await import(`@/translations/signin/${hl}.json`);
  const messages = Object.assign({}, lang.default);

  return {
    props: {
      messages
    }
  };
}

export default class Signin extends Component {
  state = {
    tab: 'account',
    load: true
  };

  componentDidMount = () => {
    const step = localStorage.getItem('_step');

    if (step === 'blog')
      this.setState({
        tab: 'blog'
      });
  }
  onUserCreate = () => {
    this.setState({
      tab: 'verify'
    });
  };

  onVerify = () => {
    this.setState({
      tab: 'blog'
    });
  };

  onVerifyError = () => {
    this.setState({
      tab: 'user'
    });
  };
  
  render() {
    const {tab} = this.state;
 
    return <Container title='Registrarse'>
      {
        tab === 'account' &&
        <UserTab onRegister={this.onUserCreate}/>
      }
      {
        tab === 'verify' &&
        <Verify onVerify={this.onVerify} onVerifyError={this.onVerifyError}/>
      }
      {
        tab === 'blog' &&
        <BlogTab />
      }
    </Container>;
  }
}
