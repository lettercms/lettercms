import {useState, useEffect} from 'react';
import AccountCard from './accountCard';
import AccountLoad from './accountCardLoad';
import sdk from '@lettercms/sdk';
import NoAccount from './noAccount';
import {useUser} from '@/lib/dashboardContext';
import Button from '@/components/button';

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
  }, [status, onAccounts])

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

    return <div>
      <div className="top">
        <Button type='outline' alt onClick={newPost} disabled={!hasAccounts}>Nueva Entrada</Button>
      </div>
      <div className='stats-notice'>
        <span>Feature aun en desarrollo. Todos los datos son de demostración</span>
      </div>
      <div id='main-social'>
        <ul>
          {UI}
        </ul>
      </div>
      <style jsx global>{`
        @keyframes loading {
           0% {
             opacity: 1;
           }
           50% 
             opacity: .5;
           }
           100% {
             opacity: 1;
           }
        }
      `}</style>
      <style jsx>{`
        .stats-notice {
          width: calc(100% - 60px);
          position: fixed;
          right: 0;
          top: 70px;
          background: #ccd7ec;
          padding: 1rem 0;
          text-align: center;
          z-index: 10;
        }
        .top {
          z-index: 1;
          width: calc(100% - 60px);
          left: 60px;
          position: fixed;
          display: flex;
          background: #5f4dee;
          color: white;
          align-items: center;
          justify-content: space-between;
          padding: 15px 5%;
          display: flex;
        }
        #main-social {
          position: absolute;
          width: 100%;
          height: max-content;
          left: 0;
          top: 50px;
          padding: 100px 5%;
        }
        #main-social ul {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
      `}</style>
    </div>;
}

