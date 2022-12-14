import {useState, useEffect} from 'react';
import AccountCard from './accountCard';
import AccountLoad from './accountCardLoad';
import sdk from '@lettercms/sdk';
import NoAccount from './noAccount';
import {useUser} from '@/components/layout';
import Button from '@/components/button';
import Top from '../listLayout/top';
import SocialIco from '@/components/assets/adminSocial';

async function fetchAccounts({setAccounts, setIsLoading, setAuthError, onAccounts}) {
  sdk.social.accounts([
    'name',
    'username',
    'picture',
    'cover'
  ]).then(accountsRes => {
    if (accountsRes.facebook?.status === 'auth-error' || accountsRes.instagram?.status === 'auth-error') {
      setAuthError(true);

      delete accountsRes.facebook;
      delete accountsRes.instagram;
    }

    const accounts = Object.keys(accountsRes).map(type => {
      return {
        ...accountsRes[type],
        type
      };
    });
        
    setIsLoading(false);
    onAccounts(accountsRes);
    setAccounts(accounts);
  });
}

export default function SocialDashboard({newPost, onAccounts}) {
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const {status} = useUser();

  const hasAccounts = accounts?.length > 0;

  useEffect(() => {
    if (status === 'done') {
      fetchAccounts({
        setAccounts,
        setAuthError,
        setIsLoading,
        onAccounts
      });
    }
  }, [status, onAccounts]);

  let UI = '';
    
    if (isLoading)
      UI = <AccountLoad/>;

    else {
      if (hasAccounts)
        UI = accounts.map((e, i) => <AccountCard key={`account-${i}`} {...e}/>);
      else
        UI = <NoAccount onAddAccount={() => fetchAccounts({
        setAccounts,
        setAuthError,
        setIsLoading,
        onAccounts
      })} authError={authError}/>;
    }

    return <div className='social-container'>
      <Top
        loading={isLoading}
        create={newPost}
        disabled={!hasAccounts}
        buttonText='Nueva Entrada'
        ico={<SocialIco/>}
        topText='Redes sociales'
      >
        <Button type='outline' onClick={newPost} disabled={!hasAccounts}>Nueva Entrada</Button>
      </Top>
      <div className='stats-notice'>
        <span>Feature aun en desarrollo. Todos los datos son de demostraci??n</span>
      </div>
      <div id='main-social'>
        <ul>
          {UI}
        </ul>
      </div>
      <style jsx>{`
        .social-container {
          width: 100%;
        }
        .stats-notice {
          width: 100%;
          background: #ccd7ec;
          padding: 1rem 0;
          text-align: center;
          z-index: 10;
        }
        #main-social {
          width: 100%;
          padding: 0 5%;
        }
        #main-social ul {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
      `}</style>
    </div>;
}

