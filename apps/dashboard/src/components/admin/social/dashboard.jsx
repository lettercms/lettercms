import {Component} from 'react';
import Base from '../../modalBase';
import AccountCard from './accountCard';
import AccountLoad from './accountCardLoad';
import sdk from '@lettercms/sdk';
import Router from 'next/router';
import NoAccount from './noAccount';
import CardBase from '../stats/base';
import HandleDate from '../../../lib/handleDate';
import Link from 'next/link';

class SocialDashboard extends Component {
  state = {
    showModal: false,
    isFacebookLogin: false,
    show: false,
    isLoading: true,
    feedLoad: false,
    authError: false,
    accounts: [],
    feed: []
  };
  componentDidMount = () => {
    setTimeout(this.fetchAccounts, 500);
  }
  fetchAccounts = async (type) => {
    /*if (type)
      return this.setState({
        loading:false,
        accounts: [Object.assign({}, demoAccount, {type})]
      });*/

    this.setState({
      isLoading: true
    });

    const accountsRes = await sdk.social.accounts([
      'name',
      'username',
      'picture',
      'cover'
    ]);

    let data = {
      isLoading: false
    };

    if (accountsRes.facebook?.status === 'auth-error' || accountsRes.instagram?.status === 'auth-error') {
      data.authError = true;

      delete accountsRes.facebook;
      delete accountsRes.instagram;
    }

    data.accounts = Object.keys(accountsRes).map(type => {
      return {
        ...accountsRes[type],
        type
      };
    });
    
    this.props.onAccounts(accountsRes);
    this.setState(data);
  }
  toggleModal = () => this.setState({
    showModal: !this.state.showModal
  });
  showFeed = async type => {
    //TODO: Remove when Social feed finished 
    if (type !== 'acc')
      return;

    this.setState({
      show: true,
      feedLoad: true
    });

    const {data} = await sdk.createRequest(`/social/${type}`);

    this.setState({
      feedLoad: false,
      feed: data
    });
  }
  render() {
    const {newPost} = this.props;
    const {accounts, isLoading, show, feed, feedLoad} = this.state;

    const hasAccounts = accounts.length > 0;

    let UI = '';
    
    if (isLoading)
      UI = <AccountLoad/>;

    else {
      if (hasAccounts)
        UI = accounts.map((e, i) => <AccountCard key={`account-${i}`} show={this.showFeed} {...e}/>);
      else
        UI = <NoAccount onAddAccount={this.fetchAccounts} authError={this.state.authError}/>;
    }

    return <div>
      <div className="top">
        <button onClick={newPost} disabled={!hasAccounts}>Nueva Entrada</button>
      </div>
      <div className='stats-notice'>
        <span>Feature aun en desarrollo. Todos los datos son de demostración</span>
      </div>
      <div id='main-social'>
        <ul>
          {UI}
        </ul>
      </div>
      <Base show={show} close={() => this.setState({show: false})}>
        <div className='feed-scroll'>
          <div className='feed-container'>
            {
              feedLoad
              ? <div>Loading</div>
              : feed.map((e, i) => <CardBase style={{paddingBottom: '1rem'}} title={`Se publicara el ${HandleDate.getGMTDate(e.created_time || e.created_at || e.timestamp)}`} key={e.id} rows={2}>
                <div className='content-container'>
                  <div className='background-image' style={{ width: !e.message ? '20rem' : '10rem' , backgroundImage: `url(${e.full_picture})`}}/>
                  <div className='post-content' style={{ width: !e.message ? '0' : '70%'}}>
                    <span>{e.message}</span>
                    <Link href={`https://www.facebook.com/${e.id}`}>
                      <a target='_blank'>
                        <img src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/link.svg'/>
                      </a>
                    </Link>
                  </div>
                </div>
              </CardBase>)
            }
          </div>
        </div>
      </Base>
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
        .content-container {
          display: flex;
          align-items: center;
        }
        .content-container .background-image {
          background-size: cover;
          background-position: center;
          height: 10rem;
        }
        .content-container .post-content {
          width: 70%;
          padding: 0 1rem;
        }
        .content-container a {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
        }
        .content-container a img {
          width: 2rem;
        }
        .feed-scroll {
          overflow: auto;
          width: 100%;
          height: 100%;
        }
        .feed-scroll .feed-container {
          display: flex;
          width: 100%;
          flex-wrap: wrap;
          flex-direction: row;
        }
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
        .top button {
          border-color: #f3f7fd;
          color: #f3f7fd;
          background: transparent;
          position: relative !important;
          left: 0 !important;
          width: 150px !important;
        }
        .top button:enabled:hover {
          background: #f3f7fd;
          color: #5f4dee;
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
}

export default SocialDashboard;
