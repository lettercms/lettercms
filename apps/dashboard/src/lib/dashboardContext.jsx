import {useState, useEffect, createContext, useContext, memo} from 'react';
import {useRouter} from 'next/router';
import sdk from '@lettercms/sdk';
import Cookie from 'js-cookie'; 
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import { createFirebaseApp } from '@/firebase/client';
import { getAuth, signInWithCustomToken  } from 'firebase/auth';

const menu = [
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
  },/*
  {
    name: 'email',
    title: 'Correo',
    path: '/dashboard/email',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/email-menu.png'
  },*/
  {
    name: 'config',
    title: 'Configuración',
    path: '/dashboard/config/blog',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/config.png' 
  },
  {
    name: 'collaborators',
    title: 'Colaboradores',
    path: '/dashboard/collaborators',
    image: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/colaborators.png'
  }
];

const DashboardContext = createContext();

export function getContext() {
  return DashboardContext;
}

export function useUser() {
  const value = useContext(DashboardContext);

  if (!value && process.env.NODE_ENV !== 'production') {
    throw new Error(
      '[lettercms]: `useUser` must be wrapped in a <DashboardProvider />'
    );
  }

  return value;
}

export function DashboardProvider({userID, children, hideMenu}) {
  const router = useRouter();
  const {status, data} = useSession();

  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const ctx = useContext(DashboardContext);
  
  const logout = () => signOut({redirect: false}).then(_ => router.push('/login'));

  useEffect(() => {
    if (!ctx && status === 'authenticated') {
      const now = new Date();

      const {user: {firebaseToken, accessToken}} = data;

      const app = createFirebaseApp();
      const auth = getAuth(app);

      signInWithCustomToken(auth, firebaseToken);
      
      sdk.setAccessToken(accessToken);
      
      sdk.accounts.update(userID, {
        lastLogin: now
      });

      Cookie.set('__last-login', now.toISOString());

      Promise.all([sdk.blogs.single(), sdk.accounts.me()])
        .then(([_blog, _account]) => {
          if (_blog.customDomain)
            _blog.domain = _blog.customDomain;
          else
            _blog.domain = `${_blog.subdomain}.lettercms.vercel.app`;

          setBlog(_blog);
          setUser(_account);
          setLoading(false);
        });
    }
  }, [ctx, status]);

  const value = isLoading
    ? {status: 'loading'}
    : {
      blog,
      user,
      status: 'done'
    };

  return <DashboardContext.Provider value={value}>
    <div>
      <aside style={{display: hideMenu ? 'none' : 'inline-block'}}>
        <ul id='nav-bar'>
          <li>
            <Link href={`https://${blog?.domain}${blog?.mainUrl}`}>
              <a target='_blank'>
                <img alt="David's Devel Logo" src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/davidsdevel-rombo.png'/>
              </a>
            </Link>
          </li>
          {menu.map(e =>
            <li key={e.name}>
              <Link href={e.path}>
                <a>
                  <img alt={e.name} src={e.image} />
                </a>
              </Link>
            </li>
          )}
          <li onClick={logout}>
            <img alt='Asset' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/logout.png'/>
          </li>
        </ul>
      </aside>
      <div id="content">
        {children}
      </div>
      <style jsx>{`
        :global(body) {
          background: #f7f7f7;
        }
        #nav-bar {
          padding: 0
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
  </DashboardContext.Provider>;
}