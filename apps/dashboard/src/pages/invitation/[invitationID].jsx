import {Component} from 'react';
import dynamic from 'next/dynamic';
import Head from'next/head';
import Link from 'next/link';
import asyncImport from '@/lib/asyncImportScript';
import Image from 'next/image';
import {getSession} from 'next-auth/react';
import Invitation from '@/components/signin/invitation';
import Footer from '@/components/miniFooter';
import dateHandler from '@/lib/handleDate';
import getInvitation from '@/lib/mongo/getInvitation';

class InvitationPage extends Component {
  state = {
    tab: 'blog',
    load: true
  };

  onUserCreate = email => {
    localStorage.setItem('tempUser', email);
    localStorage.setItem('tempStep', 'verify');

    this.setState({
      email,
      tab: 'verify'
    });
  };
  onVerify = () => {
    localStorage.setItem('tempStep', 'blog');

    Cookie.remove('userCode');
    Cookie.remove('userToken');

    this.setState({
      email: this.state.email,
      tab: 'blog'
    });
  };

  onVerifyError = () => {
    localStorage.removeItem('tempUser');
    localStorage.removeItem('tempStep');
    Cookie.remove('userCode');
    Cookie.remove('userToken');

    this.setState({
      email: null,
      tab: 'user'
    });
  };
  
  render() {
    const {blog, blogOwner, expiresAt, id, email} = this.props;

    return <div id='register-main'>
      <Head>
        <title>Una invitación especial para ti - LetterCMS</title>
      </Head>
      <div id='logo'>
        <Link href='/'>
          <a>
            <Image layout='fill' objectFit='contain' src={`${process.env.ASSETS_BASE}/images/lettercms-logo-linear.png`} alt="LetterCMS Logo Linear"/>
          </a>
        </Link>
      </div>
      <div id='wrapper-container'>
        <div className='wrapper'>
          <div id='image'>
            <Image layout='fill' objectFit='contain' src={`${process.env.ASSETS_BASE}/illustrations/62.svg`} alt=""/>
          </div>
        </div>
        <div className='wrapper'>
          <div id='invitation-text'>
            <span>{blogOwner.name} {blogOwner.lastname} te ha invitado a colaborar en:</span>
            <span id='blog-title'>{blog.title}</span>
          </div>
          <div className='form-container'>
            <Invitation email={email}/>
          </div>
          <div id='invitation-notice'>
            <span>Esta invitación caduca el: {dateHandler.getGMTDate(expiresAt)}</span>
          </div>
        </div>
      </div>
      <Footer/>
      <style jsx>{`
        #logo {
          width: 100%;
          height: 2rem;
          margin-top: 1rem;
          position: relative;
        }
        #wrapper-container {
          width: 100%;
        }
        #register-main {
          display: flex;
          position: absolute;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          min-height: 100%;
          background: white;
        }
        .wrapper {
          width: 100%;
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
          width: 100%;
          height: 30rem;
        }
        #invitation-text {
          padding: 0 5%;
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-top: -100px;
        }
        #invitation-text #blog-title {
          font-size: 2rem;
          font-weight: bold;
          letter-spacing: -1px;
        }
        #invitation-notice {
          width: 100%;
          padding: 5%;
          margin-bottom: 2rem;
        }
        @media screen and (min-width: 480px) {
          .wrapper {
            width: 400px;
          }
          .form-container {
            width: 100%;
          }
          #invitation-notice {
            width: 400px;
            padding: 0;
          }
          #invitation-text {
            width: 400px;
            padding: 0;
          }
          #image {
            width: 480px;
            margin-left: -40px;
          }
        }
        @media screen and (min-width: 720px) {
          .wrapper {
            width: 50%;
          }
          #wrapper-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          #image {
            width: 90%;
            margin-left: 0;
          }
          #invitation-text {
            margin-top: 5rem;
          }
        }
        @media screen and (min-width: 1024px) {
          #wrapper-container {
            padding: 0 5%;
            display: flex;
            max-width: 1400px;
          }
          .wrapper:nth-child(2) {
            width: 400px;
          }
          .wrapper:nth-child(1) {
            flex-grow: 1;
          }
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

export async function getServerSideProps({query}) {
  const invitation = await getInvitation(query.invitationID);

  if (invitation.notFound)
    return {
      notFound: true
    }

  return {
    props: invitation
  };
}

InvitationPage.hideMenu = true;

export default InvitationPage;
