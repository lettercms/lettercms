import {Component} from 'react';
import sdk from '@lettercms/sdk';
import * as admin from '@lettercms/admin';
import ModalBase from '@/components/modal';
import Template from './socialTemplate';

export default class Social extends Component {
  state = {
    type: null,
    instagram: null,
    facebook: null,
    twitter: null,
    showModal: false,
    accounts: []
  };
  componentDidMount = async () => {
    try {
      const res = await sdk.createRequest('/social/account');

      this.setState(res);
    } catch(err) {
      throw err;
    }
  }
  login = async type => {
    try {
      if (type === 'facebook') {
        await admin.facebookLogin([
          'pages_manage_metadata',
          'pages_manage_posts',
          'pages_read_engagement',
          'pages_show_list',
          'pages_manage_engagement'
        ]);

      } else if (type === 'instagram') {
        await admin.facebookLogin([
          'instagram_basic',
          'instagram_content_publish',
          'pages_show_list'
        ]);
      }
      const accounts = await admin.facebookPages([
        'name',
        'username',
        'cover',
        'id',
        'picture',
        'access_token'
      ]);

      this.setState({
        accounts,
        type,
        showModal: true
      });
    } catch(err) {
      alert('Error al Iniciar Sesión');
      throw err;
    }
  }
  selectAccount = async (type, id, token) => {
    try {
      const {subdomain} = await sdk.blogs.single(['subdomain']);

      if (type === 'facebook') {
        const facebook = await admin.setFacebookPage(id, token, subdomain);
        
        this.setState({
          facebook
        });
        
      } else if (type === 'instagram') {
        const instagram = await admin.setInstagramPage(id, token, subdomain);
        
        this.setState({
          instagram
        });
      }
    } catch(err) {
      alert('Error on select account');
      throw err;
    } finally {
      this.setState({
        showModal: false,
        accounts: []
      });
    }
  }
  render() {
    const {instagram, facebook, accounts, showModal, type} = this.state;

    return <ul>
      <li>
        {
          facebook === null ?
          <button className='facebook' onClick={() => this.login('facebook')}>
            <img alt='facebook white logo' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/facebook-white.svg'/>
            <span>Añadir cuenta de Facebook</span>
          </button>
          :
          <button className='linked facebook' disabled>
            <img alt={`${facebook.username} picture`} src={facebook.picture}/>
            <span>Enlazada @{facebook.username}</span>
          </button>
        }
      </li>
      <li>
        {
          instagram === null ?
          <button className='instagram' onClick={() => this.login('instagram')}>
            <img alt='instagram white logo' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/instagram-white.svg'/>
            <span>Añadir cuenta de Instagram</span>
          </button>
          :
          <button className='linked instagram' disabled>
            <img alt={`${instagram.username} picture`} src={instagram.picture}/>
            <span>Enlazada @{instagram.username}</span>
          </button>
        }
      </li>
      <br/>
      {/*<li>
        <span className="sub-title">Twitter</span>
      </li>*/}
      <ModalBase show={showModal} close={() => this.setState({showModal: false})} style={{width: 'auto', height: 'auto'}}>
        <div id='social-modal'>
          {accounts.map(e => <Template key={e.id} onSelect={() => this.selectAccount(type, e.id, e.access_token)} {...e}/>)}
        </div>
      </ModalBase>
      <style jsx>{`
        ul {
          width: 100%;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          list-style: none;
        }
        li {
          margin: .5rem 0;
        }
        #social-modal {
          top: 0 !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          justify-content: space-around !important;
          overflow-y: auto !important;
          height: 100% !important;
        }
        .linked,
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
        .linked {
          cursor: default;
          font-size: 15px;
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
        .linked img {
          border-radius: 50%;
        }
      `}</style>
    </ul>;
  }
}

