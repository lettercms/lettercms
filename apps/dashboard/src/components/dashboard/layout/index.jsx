import {useState, useEffect, createContext, useContext, useRef} from 'react';
import Router from 'next/router';
import Link from 'next/link';
import {signOut} from 'next-auth/react';
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
  dashboardHome,
  bottomButtons,
  languageBox
} from './index.module.css';
import MenuLoad from './menuLoad';
import {FaHome, FaSignOutAlt} from 'react-icons/fa';
import languages from './languages';
import MobileLayout from './mobileLayout';

const Nav = dynamic(() => import('./nav'), {
  loading: MenuLoad,
  ssr: false
});

const logout = async () => {
  const app = createFirebaseApp();
  const auth = getAuth(app);

  await app.signOut();
  await signOut({redirect: false});
  
  Router.push('/login');
};

const setLanguage = hl => {
  Cookie.set('__lcms-hl', hl);

  Router.reload();
};

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

const initLoader = (setLoad, setIsMenuOpen) => {
  Router.events.on('routeChangeStart', () => setLoad(true));
  Router.events.on('routeChangeComplete', () => {
    setLoad(false);
    setIsMenuOpen(false);
  });
};

export function DashboardProvider({userID, children, hideMenu}) {
  const {status, data} = useSession();

  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isOpenLanguages, setIsOpenLanguages] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const languagesRef = useRef(null);
  const asideRef = useRef(null);

  const ctx = useContext(DashboardContext);

  const router = Router.useRouter();

  const languageArray = Object.entries(languages);

  useEffect(() => {
    if (isOpenLanguages) {
      languagesRef.current.style.display = 'block';

      setTimeout(() => {
        languagesRef.current.style.opacity = 1;
      }, 0);

    } else {
      languagesRef.current.style.opacity = 0;

      setTimeout(() => {
        languagesRef.current.style.display = 'none';
      }, 310);
    }
  }, [isOpenLanguages]);

  useEffect(() => {
    if (window.screen.availWidth < 480) {
      if (isMenuOpen)
        asideRef.current.style.left = 0;
      else
        asideRef.current.style.left = '-100%';
    } else {
      asideRef.current.style.left = 0;
    }
  },[isMenuOpen]);

  useEffect(() => {
    if (!ctx && status === 'authenticated') {
      initLoader(setLoad, setIsMenuOpen);

      window.setLoad = setLoad;

      const now = new Date();

      const {user: {firebaseToken, accessToken}} = data;

      //const app = createFirebaseApp();
      //const auth = getAuth(app);

      //signInWithCustomToken(auth, firebaseToken);
      
      sdk.setAccessToken(accessToken);
      
      sdk.accounts.update(userID, {
        lastLogin: now
      });

      Cookie.set('__last-login', now.toISOString());

      Promise.all([
        sdk.blogs.single(),
        sdk.accounts.me()
      ])
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
      <MobileLayout isOpen={isMenuOpen} onOpen={() => setIsMenuOpen(true)} onClose={() => setIsMenuOpen(false)}>
        <aside className={menuAside} ref={asideRef}>
          {
            load &&
            <div className={dashboardSpinner} style={{animation: 'rotation linear .6s infinite'}}/>
          }
          {
            !isLoading &&
            <Link target='_blank' href={`https://${blog?.domain}${blog?.mainUrl}`} className={dashboardHome}>
              <FaHome fill='#362e6f' height='20'/>
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
            <li>
              <div className={bottomButtons}>
                <button onClick={logout}>
                  <FaSignOutAlt fill='#362e6f' height='24'/>
                </button>
                <button onFocus={() => setIsOpenLanguages(true)} onBlur={() => setIsOpenLanguages(false)}>
                  {
                    languages[router.query.hl].icon
                  }
                </button>
                <ul className={languageBox} ref={languagesRef}>
                  {languageArray.map(([name, value]) => {
                    return <li key={name}>
                      <button disabled={name === router.query.hl} onClick={() => setLanguage(name)}>
                        {value.icon}
                        <span>{value.name}</span>
                      </button>
                    </li>;
                  })}
                </ul>
              </div>
            </li>
            <Link href='/'>
              <img src={`${process.env.ASSETS_BASE}/images/lettercms-logo-linear.png`} alt='LetterCMS linear Logo' className={footerImg}/> 
            </Link>
          </div>
        </aside>
      </MobileLayout>
      <div className={content}>
        {children}
      </div>
      <style jsx global>{`
        body {
          background: #fff;
        }
      `}</style>
  </DashboardContext.Provider>;
}