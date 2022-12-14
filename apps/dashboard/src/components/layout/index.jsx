import {useState, useEffect, createContext, useContext, memo} from 'react';
import Home from '@/components/svg/home';
import Router from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import sdk from '@lettercms/sdk';
import Cookie from 'js-cookie'; 
import {option} from './option.module.css';
import {useSession} from 'next-auth/react';
import {createFirebaseApp } from '@/firebase/client';
import {getAuth, signInWithCustomToken} from 'firebase/auth';
import {
  dashboardSpinner,
  navBar,
  menuAside,
  content,
  asideHr,
  asideImg,
  asideFooter,
  footerImg,
  accountName,
  asideNameLoad,
  dashboardHome
} from './index.module.css';
import MenuLoad from './menuLoad';

const Nav = dynamic(() => import('./nav'), {
  loading: MenuLoad,
  ssr: false
});

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

const initLoader = setLoad => {
  Router.events.on('routeChangeStart', () => setLoad(true));
  Router.events.on('routeChangeComplete', () => setLoad(false));
};

export function DashboardProvider({userID, children, hideMenu}) {
  const {status, data} = useSession();

  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const ctx = useContext(DashboardContext);

  const router = Router.useRouter();

  useEffect(() => {
    if (!ctx && status === 'authenticated') {
      initLoader(setLoad);

      window.setLoad = setLoad;

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
  }, [ctx, status, data, userID]);

  const value = isLoading
    ? {status: 'loading'}
    : {
      blog,
      user,
      status: 'done'
    };

  return <DashboardContext.Provider value={value}>
    <div>
      <aside className={menuAside} style={{display: hideMenu ? 'none' : 'inline-block'}}>
        {
          load &&
          <div className={dashboardSpinner} style={{animation: 'rotation linear .6s infinite'}}/>
        }
        {
          !isLoading &&
          <Link href={`https://${blog?.domain}${blog?.mainUrl}`}>
            <a target='_blank' className={dashboardHome}>
              <Home fill='#362e6f' height='20'/>
            </a>
          </Link>
        }
        {
          isLoading
            ? <div className={asideImg} style={{background: '#ccd7ec'}}/>
            : <img src={user.photo + '?w=100&h=100&q=50'} className={asideImg} alt={`${user.name} ${user.lastname} profile picture`}/>
        }
        {
          isLoading
            ? <div className={asideNameLoad}/>
            : <span className={accountName}>{user.name} {user.lastname}</span>
        }
        <ul className={navBar}>
          {
            isLoading
            ? <MenuLoad/>
            : <Nav role={user.role} blog={blog}/>
          }
        </ul>
        <div className={asideFooter}>
          <Link href='/'>
            <a>
             <img src={`${process.env.ASSETS_BASE}/images/lettercms-logo-linear.png`} alt='LetterCMS linear Logo' className={footerImg}/> 
            </a>
          </Link>
        </div>
      </aside>
      <div className={content} style={{width: hideMenu ? '100%' : '85%', left: hideMenu ? 0 : '15%'}}>
        {children}
      </div>
      <style jsx global>{`
        body {
          background: #fff;
        }
      `}</style>
    </div>
  </DashboardContext.Provider>;
}