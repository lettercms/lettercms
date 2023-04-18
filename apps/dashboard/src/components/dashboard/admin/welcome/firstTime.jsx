import {useEffect} from 'react';
import {FormattedMessage} from 'react-intl';
import {useUser} from '@/components/dashboard/layout';
import sdk from '@lettercms/sdk';
import Link from 'next/link';

const FirstTime = ({name, id}) =>  {
  useEffect(() => {
    sdk.accounts.update(id, {firstTime: false});
  }, [id]);

  return <div id='first-time-main'>
    <div id='welcome-title'>
      <span className='title-name'>
        <span>
          <FormattedMessage id='Welcome '/>
        </span>
        <span className='user-name'>{name}</span>
      </span>
      <p>
        <FormattedMessage id='We are happy that you have chosen us'/>
      </p>
    </div>
    <img src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/welcome.svg' alt='LetterCMS - Welcome'/>
    <div id='welcome-links'>
      <div>
        <span>
          <FormattedMessage id='Visit our'/>
        </span>
        <a href='#'>
          <FormattedMessage id='User guide'/>
        </a>
      </div>
      <div>
        <span>
          <FormattedMessage id='Read our'/>
        </span>
        <Link href='/terms'>
          <FormattedMessage id='Terms and Conditions'/>
        </Link>
      </div>
      <div>
        <span>
          <FormattedMessage id='Interact with us in'/>
        </span>
        <a href='https://www.facebook.com/davidsdevel'>Facebook</a>
      </div>
    </div>
    <style jsx>{`
      #first-time-main {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        height: 100%;
      }
      img {
        margin: -100px auto;
      }
      #welcome-title,
      p {
        text-align: center;
      }
      #welcome-title {
        padding: 25px 0;
        margin: 3rem 0 0;
      }
      #welcome-title span {
        font-weight: bold;
        font-size: 54px;
        color: #888;
      }
      #welcome-title span span.user-name {
        color: #31446c;
      }
      #welcome-links {
        display: flex;
        justify-content: space-around;
      }
      #welcome-links div {
        display: flex;
        flex-direction: column;
        border-left: 15px solid #5f4dee;
        border-radius: 10px;
        padding: 15px 10px;
      }
      #welcome-links div span {
        margin: 0 0 10px 0;
      }
      @media (max-width: 480px) {
        .title-name {
          display: flex;
          flex-direction: column;
        }
        .title-name span {
          margin: 1rem 0;
        }
        img {
          width: 100%;
          margin: auto !important;
        }
        #welcome-links {
          flex-direction: column;
          width: 90%;
          margin: auto;
        }
        #welcome-links div {
          margin: .5rem 0;
        }
      }
    `}</style>
  </div>;
};

export default FirstTime;
