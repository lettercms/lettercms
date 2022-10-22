import {Component} from 'react';
import dynamic from 'next/dynamic';
import Head from'next/head';
import asyncImport from '../lib/asyncImportScript';
import Image from 'next/image';
import {getSession} from 'next-auth/react';
import Cookie from 'js-cookie';

const BlogTab = dynamic(import('../components/signin/blog'));
const UserTab = dynamic(import('../components/signin/user'), {
  ssr: true
});
const Verify = dynamic(import('../components/signin/verify'));

export async function getServerSideProps({req, res, query}) {
  const {invitationID, token} = query;

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

  return {
    props: {}
  };
}

export default class Signin extends Component {
  state = {
    tab: 'account',
    load: true
  };

  onUserCreate = email => {
    this.setState({
      email,
      tab: 'verify'
    });
  };

  onVerify = () => {
    this.setState({
      email: this.state.email,
      tab: 'blog'
    });
  };

  onVerifyError = () => {
    this.setState({
      email: null,
      tab: 'user'
    });
  };
  
  render() {
    const {token, invitationID} = this.props;
    const tab = invitationID ? 'invitation' : this.state.tab;
    const {load} = this.state;
 
    return <div id='register-main'>
      <Head>
        <title>Signin - LetterCMS</title>
      </Head>
      <div id='image'>
        <Image
          layout='fill'
          src={`${process.env.ASSETS_BASE}/images/lettercms-logo-white-standalone.png`}
          alt='LetterCMS Logo White'
          objectFit='contain'
        />
      </div>
      <div className='form-container'>
        {
          tab === 'invitation' &&
          <div>{invitationID}</div>
        }
        {
          tab === 'account' &&
          <UserTab onRegister={this.onUserCreate}/>
        }
        {
          tab === 'verify' &&
          <Verify email={this.state.email} onVerify={this.onVerify} onVerifyError={this.onVerifyError}/>
        }
        {
          tab === 'blog' &&
          <BlogTab ownerEmail={this.state.email}/>
        }
      </div>
      <style jsx>{`
        #register-main {
          display: flex;
          position: absolute;
          flex-direction: column;
          justify-content: space-beteewn;
          align-items: center;
          padding: 50px 0;
          width: 100%;
          min-height: 100%;
          background: #5f4dee;
        }
        .form-container {
          width: 90%;
          max-width: 400px;
          margin: 50px auto 15px;
        }
        :global(.form) {
          padding: 25px 5%;
          width: 100%;
          background: #f7f7f7;
          border-radius: 0.25rem;
        }
        #image {
          position: relative;
          margin: 100px auto 15px;
          height: 146px;
          width: 126px;
        }
      `}</style>
      <style global=''>{`
        .load-rotation {
          display: block;
          width: 50px;
          animation: rotation linear .7s infinite;
          margin: auto;
        }
      `}</style>
    </div>;
  }
}
