import {useState, useEffect, createContext, useContext, memo} from 'react';
import Router from 'next/router';
import sdk from '@lettercms/sdk';
import Cookie from 'js-cookie'; 
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import { createFirebaseApp } from '@/firebase/client';
import { getAuth, signInWithCustomToken  } from 'firebase/auth';
import menu from './menu';
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
  asideNameLoad
} from './index.module.css';
import {option} from './option.module.css';
import Option from './option';
import Home from '@/components/svg/home';
import PowerOff from '@/components/svg/powerOff';
import MenuLoad from './menuLoad'

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

const logout = () => signOut({redirect: false}).then(_ => Router.push('/login'));

export function DashboardProvider({userID, children, hideMenu}) {
  const {status, data} = useSession();

  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const ctx = useContext(DashboardContext);

  const router = Router.useRouter()

  useEffect(() => {
    if (!ctx && status === 'authenticated') {

      router.events.on('routeChangeStart', () => setLoad(true));
      router.events.on('routeChangeComplete', () => setLoad(false));

      window.setLoad = setLoad;

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
      <aside className={menuAside} style={{display: hideMenu ? 'none' : 'inline-block'}}>
        {
          load &&
          <div className={dashboardSpinner} style={{animation: 'rotation linear .6s infinite'}}/>
        }
        {
          isLoading
            ? <div className={asideImg} style={{background: '#ccd7ec'}}/>
            : <img src={user.photo} className={asideImg} alt={`${user.name} ${user.lastname} profile picture`}/>
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
            : <>
              <li className={option}>
                <Link href={`https://${blog?.domain}${blog?.mainUrl}`}>
                  <a target='_blank'>
                    <span>
                      <Home fill='#362e6f' height='12' width='32'/>
                    </span>
                    <span>Inicio</span>
                  </a>
                </Link>
              </li>
              {menu.filter(e => {
                if (!e.admin)
                  return true;
                else {
                  if (user.role === 'admin')
                    return true;
                  else
                    return false;
                }
              }).map(e => <>
                <hr className={asideHr}/>
                <Option key={e.name} role={user.role} {...e}/>
                </>
              )}
              <hr className={asideHr}/>
              <li className={option} onClick={logout}>
                <span>
                  <PowerOff fill='#362e6f' height='12' width='32'/>
                </span>
                <span>Cerrar Sesión</span>
              </li>
            </>
          }
        </ul>
        <div className={asideFooter}>
           <img src={`${process.env.ASSETS_BASE}/images/lettercms-logo-linear.png`} className={footerImg}/>
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