import {useState, useEffect} from 'react';
import {useIntl, FormattedMessage} from 'react-intl';
import Base from '../stats/base';
import General from '../stats/general';
import sdk from '@lettercms/sdk';
import Card from '../stats/statsSingleCard';
import BaseLoad from '../stats/baseLoad';
import {useUser} from '@/components/layout';

export default function WelcomeDashboard() {
  const {status, user} = useUser();
  const [isLoading, setLoad] = useState(true);
  const [stats, setStats] = useState({});

  const intl = useIntl();

  useEffect(() => {
    if (status === 'done') {
      sdk.stats.all({
        start: user.lastLogin,
        fields: [
          'general.totalViews',
          'general.totalComments',
          'general.subscriptors',
          'general.mostViewed',
          'subscriptors',
          'views',
          'comments',
          'data.views'
        ]
      }).then(_stats => {
        setStats(_stats);
        setLoad(false);
      });
    }
  }, [status, user.lastLogin]);

  let UI = '';

  if (isLoading) {
    UI = <div key='welcome-load' className='dashboard-container' style={{animation: 'bounce infinite ease-in 2s'}}>
      <BaseLoad rows={3}/>
      <BaseLoad rows={3}/>
      <BaseLoad rows={3}/>
    </div>;
  } else {

    UI = <div key='welcome' className='dashboard-container'>
      <Base
        rows={3}
        title={
          intl.formatMessage({
            id: 'Views'
          })
        }
        principal
      >
        <General
          value={stats.general.totalViews || 0}
          growth={stats.views || 0}
          growthText={
            intl.formatMessage({
              id: 'since your last login'
            })
          }
        />
      </Base>
      <Base
        rows={3}
        title={
          intl.formatMessage({
            id: 'Comments'
          })
        }
      >
        <General
          value={stats.general.totalComments}
          growth={stats.comments || 0}
          growthText={
            intl.formatMessage({
              id: 'since your last login'
            })
          }
        />
      </Base>
      <Base
        rows={3}
        title={
          intl.formatMessage({
            id: 'Subscribers'
          })
        }
      >
        <General
          value={stats.general.subscriptors || 0}
          growth={stats.subscriptors}
          growthText={
            intl.formatMessage({
              id: 'since your last login'
            })
          }
        />
      </Base>
      <div id='most-viewed-container'>
        <span className="title">
          <FormattedMessage id='More seen'/>
        </span>
          {
            stats.general.mostViewed
            ? <Card {...stats.general.mostViewed} />
            : <div id='not-most-viewed'>
              <FormattedMessage id='There are no recent views'/>
            </div>
          }
      </div>
    </div>;
  }

  return <div>
    <div id='welcome-title'>
      <span>
        <FormattedMessage id='Summary'/>
      </span>
    </div>
    <div id='welcome-panels'>
      {UI}
    </div>
    <style jsx>{`
      :global(.dashboard-container) {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
      }
      :global(#most-viewed-container) {
        width: 100%;
        margin: auto;
        display: flex;
        flex-direction: column;
      }
      :global(#not-most-viewed) {
        width: 100%;
        background: #03a9f4;
        height: 150px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 1.5rem;
      }
      #welcome-title {
        font-size: 32px;
        color: #333;
        margin: 25px 0;
        font-weight: bold;
        width: 100%;
        text-align: center;
      }
      #welcome-panels {
        position: relative;
      }
    `}</style>
  </div>;
}
