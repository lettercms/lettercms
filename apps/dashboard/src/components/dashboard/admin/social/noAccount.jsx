import {useState, useEffect} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import Template from '../config/selectAccountTemplate';
import ModalBase from '@/components/modal';
import Input from '@/components/input';

import sdk from '@lettercms/sdk';
import * as admin from '@lettercms/admin';
import Button from '@/components/button';

const updateAccounts = async (type, cb, intl) => {
  try {
    if (type === 'facebook') {
      const {authResponse: {accessToken}} = await admin.facebookLogin([
        'pages_manage_metadata',
        'pages_manage_posts',
        'pages_read_engagement',
        'pages_show_list',
        'pages_manage_engagement',
        'instagram_basic',
        'instagram_content_publish'
      ]);

      const {status} = await sdk.createRequest('/social/account', 'PATCH', {
        accessToken,
        type: 'facebook'
      });

      if (status === 'OK')
        cb();
    }
  } catch(err) {
    alert(
      intl.formatMessage({
        id: 'Error on log in'
      })
    );

    throw err;
  }
};

const login = async (type, cb, intl) => {
  try {
    if (type === 'facebook')
      await admin.facebookLogin([
        'pages_manage_metadata',
        'pages_manage_posts',
        'pages_read_engagement',
        'pages_show_list',
        'pages_manage_engagement'
      ]);

    else if (type === 'instagram')
      await admin.facebookLogin([
        'instagram_basic',
        'pages_show_list',
        'instagram_content_publish'
      ]);

    const accounts = await admin.facebookPages([
      'name',
      'username',
      'cover',
      'id',
      'picture',
      'access_token'
    ]);

    cb(type, accounts);
  } catch(err) {
    alert(
      intl.formatMessage({
        id: 'Error on log in'
      })
    );

    throw err;
  }
};
const selectAccount = async (type, id, token, cb, intl) => {
  try {
    const {subdomain} = await sdk.blogs.single(['subdomain']);

    if (type === 'facebook')
      await admin.setFacebookPage(id, token, subdomain);
    if (type === 'instagram')
      await admin.setInstagramPage(id, token, subdomain);
  } catch(err) {
    alert(
      intl.formatMessage({
        id: 'Error selecting account'
      })
    );
    throw err;
  } finally {
    cb();
  }
};


const UpdateButtons = ({onUpdate, className}) => {
  const intl = useIntl();

  return <ul className={className}>
    <li>
      <span>
        <FormattedMessage id='Please log in again'/>
      </span>
    </li>
    <li>
      <button className='facebook' onClick={() => updateAccounts('facebook', onUpdate, intl)}>
        <img alt='facebook white logo' src={`${process.env.ASSETS_BASE}/assets/facebook-white.svg`}/>
        <span>
          <FormattedMessage id='Update account'/>
        </span>
      </button>
    </li>
    <style jsx>{`
      ul {
        list-style: none;
      }
      ul li {
        margin: 1rem 0;
      }
      button {
        width: 250px;
        height: 50px;
        display: flex;
        padding: 0 5%;
        max-width: 250px;
        justify-content: space-between;
        align-items: center;
        border-radius: 5px;
      }
      .facebook {
        background: #3b5998;
      }
      .instagram {
        background: #e4405f;
      }
      .facebook img,
      .instagram img,
      .twitter img {
        width: 30px;
      }
      .facebook span,
      .instagram span,
      .twitter span {
        color: white;
        font-weight: bold;
      }
    `}</style>
  </ul>;
};

const Buttons = ({onSelect, className}) => {
  const intl = useIntl();

  return <ul className={className}>
    <li>
      <button className='facebook' onClick={() => login('facebook', onSelect, intl)}>
        <img alt='facebook white logo' src={`${process.env.ASSETS_BASE}/assets/facebook-white.svg`}/>
        <span>
          <FormattedMessage id='Add Facebook account'/>
        </span>
      </button>
    </li>
    <li>
      <button className='instagram' onClick={() => login('instagram', onSelect, intl)}>
        <img alt='instagram white logo' src={`${process.env.ASSETS_BASE}/assets/instagram-white.svg`}/>
        <span>
          <FormattedMessage id='Add Instagram account'/>
        </span>
      </button>
    </li>
    <style jsx>{`
      ul {
        list-style: none;
      }
      ul li {
        margin: 1rem 0;
      }
      button {
        width: 250px;
        height: 50px;
        display: flex;
        padding: 0 5%;
        max-width: 250px;
        justify-content: space-between;
        align-items: center;
        border-radius: 5px;
      }
      .facebook {
        background: #3b5998;
      }
      .instagram {
        background: #e4405f;
      }
      .facebook img,
      .instagram img,
      .twitter img {
        width: 30px;
      }
      .facebook span,
      .instagram span,
      .twitter span {
        color: white;
        font-weight: bold;
      }
    `}</style>
  </ul>;
};

const Accounts = ({accounts, className, onSelect, type}) => {
  const intl = useIntl();

  return <div id='social-modal' className={className}>
    {accounts.map(e => <Template key={e.id} onSelect={() => selectAccount(type, e.id, e.access_token, onSelect, intl)} {...e}/>)}
  </div>;
};

function NoAccount({onAddAccount, authError}) {
  const [type, setType] = useState(''); 
  
  const [accounts, setAccounts] = useState([]);
  const [showModal, setModal] = useState(false);
  const [active, setActive] = useState(1);
  const [className, setShow] = useState('show');

  useEffect(() => {
    if (authError)
      setTimeout(() => setModal(true), 500);
  }, [authError]);

  return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-75px', margin: 'auto'}}>
    <div className='data-text'>
      <span>
        <FormattedMessage id='Oops, we have nothing here yet'/>
      </span>
    </div>
    <Button className='add-social' type='outline' onClick={() => setModal(true)}>
      <FormattedMessage id='Add social media'/>
    </Button>
    <ModalBase
      show={showModal}
      close={() => {
        setModal(false);
        setTimeout(() => setActive(1), 700);
      }}
      width='auto'
      height='auto'
    >
      {
        authError && <UpdateButtons className={className} onUpdate={onAddAccount}/>
      }
      {
        active === 1 && !authError &&
        <Buttons className={className} onSelect={(_type, _accounts) => {
          setAccounts(_accounts);
          setShow('hide');
          setType(_type);

          setTimeout(() => {
            setActive(2);
            setShow('show');
          }, 700);
        }}/>
      }
      {
        active === 2 && !authError &&
        <Accounts type={type} className={className} accounts={accounts} onSelect={() => onAddAccount(type)}/>
      }
    </ModalBase>
    <style jsx>{`
      .data-text {
        padding: 5rem 0 7rem;
      }
      .data-text span {
        font-size: 2rem;
        color: var(--main-alt);
      }
    `}</style>
    <style jsx global>{`
      .add-social {
        margin-bottom: 2rem;
      }
      .show,
      .hide {
        transition: ease .6s;
        top: 0;
      }
      .show {
        left: 0;
      }
      .hide {
        left: -100%;
      }
    `}</style>
  </div>;
}

export default NoAccount;
