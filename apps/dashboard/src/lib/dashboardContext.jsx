import {useState, useEffect, createContext, useContext, memo} from 'react';
import {useRouter} from 'next/router';
import sdk from '@lettercms/sdk';
import Cookie from 'js-cookie'; 
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import { createFirebaseApp } from '@/firebase/client';
import { getAuth, signInWithCustomToken  } from 'firebase/auth';
import Cross from '@/components/svg/cross';

const menu = [
  {
    name: 'posts',
    title: 'Entradas',
    icon: <Cross fill='#5f4dee' height='12'/>
  },
  {
    name: 'pages',
    title: 'Paginas',
    icon: <Cross fill='#5f4dee' height='12'/>
  },
  {
    name: 'stats',
    title: 'Datos',
    icon: <Cross fill='#5f4dee' height='12'/>
  },
  {
    name: 'social',
    title: 'Redes Sociales',
    icon: <Cross fill='#5f4dee' height='12'/>
  },
  {
    name: 'config',
    title: 'Configuración',
    icon: <Cross fill='#5f4dee' height='12'/>
  },
  {
    name: 'collaborators',
    title: 'Colaboradores',
    icon: <Cross fill='#5f4dee' height='12'/>
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
/*
      const app = createFirebaseApp();
      const auth = getAuth(app);

      signInWithCustomToken(auth, firebaseToken);*/
      
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
                <span>
                  <Cross fill='#5f4dee' height='12'/>
                </span>
                <span>Inicio</span>
              </a>
            </Link>
          </li>
          {menu.map(e => <>
            <hr/>
            <li key={e.name}>
              <span>{e.icon}</span>
              <span>{e.title}</span>
            </li>
            </>
          )}
        </ul>
      </aside>
      <div id="content">
        {children}
      </div>
      <style jsx>{`
        :global(body) {
          background: #fff;
        }
        #nav-bar {
          padding: 0
        }
        aside {
          position: fixed;
          width: 15%;
          display: inline-block;
          height: 100%;
          left: 0;
          background: #f7f7f7;
          color: #5f4dee;
        }
        aside hr {
          width: 70%;
          margin: auto;
        }
        :global(aside ul li) {
          cursor: pointer;
          padding: .5rem;
          transition: ease .3s;
          font-size: .8rem;
          font-weight: bold;
        }
        :global(aside ul li:hover) {
          background: rgba(255,255,255,.5);
        }
        :global(aside ul li img) {
          width: 100%;
        }
        #content {
          position: absolute;
          width: 85%;
          display: inline-flex;
          height: 100%;
          justify-content: center;
          padding: 0 5%;
          left: 15%;
        }
      `}</style>
    </div>
  </DashboardContext.Provider>;
}