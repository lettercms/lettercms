import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {signOut} from 'next-auth/react';
import Link from 'next/link';

const menu = [
  [`${process.env.ASSETS_BASE}/images/posts-menu.png`,
    [
      {
        name: 'Entradas',
        href: '/dashboard/posts'
      },
      {
        name: 'Pruebas A/B',
        href: '/dashboard/posts/tests'
      }
    ],
    'post'
  ]
  
];

/*const menu = [
  []
  {
    name: 'posts',
    title: 'Entradas',
    path: '/dashboard/posts',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/posts-menu.png' 
  },
  {
    name: 'pages',
    title: 'Paginas',
    path: '/dashboard/pages',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/pages-menu.png' 
  },
  {
    name: 'stats',
    title: 'Datos',
    path: '/dashboard/stats',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/stats-menu.png' 
  },
  {
    name: 'social',
    title: 'Redes Sociales',
    path: '/dashboard/social',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/earth.svg' 
  },
  {
    name: 'email',
    title: 'Correo',
    path: '/dashboard/email',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/email-menu.png'
  },
  {
    name: 'config',
    title: 'Configuración',
    path: '/dashboard/config',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/config.png' 
  },
  {
    name: 'collaborators',
    title: 'Colaboradores',
    path: '/dashboard/collaborators',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/colaborators.png'
  }
];*/

function Layout({hideMenu}) {
  const router = useRouter();
  const [hovered, setHover] = useState('');
  const [active, setActive] = useState('');
  const logout = () => signOut({redirect: false}).then(_ => router.push('/login'));

  useEffect(() => {
    if (hovered !== active) {
      setActive(hovered);
    }
  }, [hovered]);

  return <>
    <div>
      <div id='dashboard-top'></div>
      <aside style={{display: hideMenu ? 'none' : 'inline-block'}} onMouseOver={({target: {dataset}}) => setHover(dataset['id'])}>
        <ul id='nav-bar'>
          <li>
            <Link href={'/'}>
              <a target='_blank'>
                <img alt="David's Devel Logo" src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/davidsdevel-rombo.png'/>
              </a>
            </Link>
          </li>
          {menu.map(([url, childrens, key]) =>
            <li key={url} data-id={key} >
              <img src={url} data-id={key}/>
              <div className='sub-menu' data-id={key} onMouseOver={({target: {dataset}}) => setHover(dataset['id'])}>
                <ul data-id={key}>
                  {childrens.map(e => <li data-id={key} key={e.href}>{e.name}</li>)}
                </ul>
              </div>
            </li>
          )}
          <li onClick={logout}>
            <img alt='Asset' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/logout.png'/>
          </li>
        </ul>
      </aside>
      <div id="content">
        
      </div>
      <style jsx>{`
        #dashboard-top {
          width: 100%;
          background: red;
          height: 3rem;
          position: fixed;
        }
        :global(body) {
          background: #f7f7f7;
        }
        #nav-bar * {
          list-style: none;
        }
        #nav-bar {
          padding: 0;
        }
        aside {
          top: 3rem;
          position: fixed;
          width: 60px;
          display: inline-block;
          height: calc(100% - 3rem);
          left: 0;
          background: #362e6f;
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
        #nav-bar li {
          position: relative;
        }
        .sub-menu {
          width: 10rem;
          background: white;
          left: -100px;
          position: absolute;
          top: 0;
          padding: 0.5rem 0.25rem;
          border-radius: 10px;
          font-size: .75rem;
          transition: ease .6s;
        }
        .sub-menu.active {
          left: 60px;
        }
      `}</style>
    </div>
  </>;
}

Layout.hideMenu = true;

export default Layout;
