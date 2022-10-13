import { Component } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import Link from 'next/link';
import Load from '../logoLoad';
import NotFound from '@/pages/404';
import Image from 'next/image';
import {signOut} from 'next-auth/react';

//Dynamics
const Welcome = dynamic(() => import('./welcome'), {
  loading: Load
});
const Posts = dynamic(() => import('./posts'), {
  loading: Load
});
const Pages = dynamic(() => import('./pages'), {
  loading: Load
});
const Stats = dynamic(() => import('./stats'), {
  loading: Load
});
const SocialMedia = dynamic(() => import('./social'), {
  loading: Load
});
const Config = dynamic(() => import('./config'), {
  loading: Load
});
const Colaborators = dynamic(() => import('./colaborators'), {
  loading: Load
});
const Email = dynamic(() => import('./email'), {
  loading: Load
});

const menu = [
  {
    name: 'posts',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/posts-menu.png' 
  },
  {
    name: 'pages',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/pages-menu.png' 
  },
  {
    name: 'stats',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/stats-menu.png' 
  },
  {
    name: 'social',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/earth.svg' 
  },
  {
    name: 'email',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/email-menu.png'
  },
  {
    name: 'config',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/config.png' 
  },
  {
    name: 'collaborators',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/colaborators.png' 
  }
];

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 1,
      display: 'flex',
      showMenu: true,
      tab: props.tab
    };
    this.changeTab = this.changeTab.bind(this);
    this.logout = this.logout.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

 
  }

  changeTab(tab) {
    this.setState({
      tab
    });
    Router.push(`/dashboard?tab=${tab}`, `/dashboard/${tab}`);
  }

  async logout() {
    try {
      const res = await signOut({
        redirect: false
      });

      Router.push('/login');
    } catch (err) {
      alert('Error al cerrar la sesión');
      throw err;
    }
  }

  show() {
    this.setState({
      display: 'flex',
      opacity: 1,
    });
  }

  hide() {
    this.setState({
      opacity: 0,
    });

    setTimeout(() => this.setState({ display: 'none' }), 310);
  }

  render() {
    let {role, permissions} = this.props;
    const {showMenu, tab} = this.state;

    permissions = [];
    role = 'admin';

    let UI;

    if (tab === 'welcome')
        UI = <Welcome />;
    else if (tab === 'posts')
        UI = <Posts />;
    else if (tab === 'pages')
        UI = <Pages />;
    else if (tab === 'stats')
        UI = <Stats />;
    else if (tab === 'social')
        UI = <SocialMedia />;
    else if (tab === 'config')
        UI = <Config />;
    else if (tab === 'collaborators')
        UI = <Colaborators />;
    else if (tab === 'email')
        UI = <Email />;
    else 
      return <NotFound/>;

    const isAdmin = role === 'admin';

    return (
      <div>
        <aside style={{display: showMenu ? 'inline-block' : 'none'}}>
          <ul id='nav-bar'>
            <li>
              <Link href='/'>
                <a>
                  <img alt="David's Devel Logo" src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/davidsdevel-rombo.png'/>
                </a>
              </Link>
            </li>
            {menu.map(e => (isAdmin || permissions.indexOf(e.name) > -1)
              && <li key={`button-${e.name}`} onClick={() => this.changeTab(e.name)}>
                <img alt={e.name} src={e.image} />
              </li>
            )}
            <li onClick={this.logout}>
              <img alt='Asset' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/logout.png'/>
            </li>
          </ul>
        </aside>
        <div id="content">
          {UI}
        </div>
        <style jsx>{`
          #nav-bar {
            padding: 0
          }
          :global(.center) {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            height: 100%;
            position: relative;
            width: 300px;
            margin: auto;
          }
          :global(.center img) {
            width: 150px;
            display: block;
          }
          :global(.center span) {
            margin-bottom: 20px;
          }
          aside {
            position: fixed;
            width: 60px;
            display: inline-block;
            height: 100%;
            left: 0;
            background: #0a1128;
          }
          :global(aside ul li) {
            cursor: pointer;
            padding: 7.5px;
            transition: ease .3s;
          }
          :global(aside ul li:hover) {
            background: rgba(255,255,255,.5);
          }
          :global(aside ul li img) {
            width: 100%;
          }
          #content {
            position: absolute;
            width: calc(100% - 60px);
            display: inline-flex;
            height: 100%;
            justify-content: center;
            padding: 0 5%;
            left: 60px;
          }
        `}</style>
      </div>
    );
  }
}
