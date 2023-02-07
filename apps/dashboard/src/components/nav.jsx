import {FormattedMessage} from 'react-intl';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useState, useEffect, useRef} from 'react';
import {useSession} from 'next-auth/react';
import Search from '@/components/svg/search';
import Github from '@/components/svg/github';
import Button from '@/components/button';
import Times from '@/components/svg/times';
import Bars from '@/components/svg/bars';
import MobileNav from './mobileNav';
import sdk from '@lettercms/sdk';

export default function Nav () {
  const prevScrollY = useRef(0);
  const [isOpen, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [load, setLoad] = useState(true);

  const router = useRouter();

  const {status, data} = useSession();

  useEffect(() => {
    if (status === 'authenticated' && !profilePicture && data.user) {
      let _sdk = new sdk.Letter(data.user.accessToken);

      _sdk.accounts.me([
        'photo'
      ])
      .then(({photo}) => {
        setProfilePicture(photo);
        setLoad(false);
      });
    } else {
      setLoad(false);
    }

  }, [status, router.pathname, data?.user, profilePicture]);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current  > 200 && !isOpen) {
        setOpen(true);
      }
      if (prevScrollY.current < 200 && isOpen) {
        setOpen(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  return <nav className={'navbar navbar-expand-lg navbar-dark navbar-custom fixed-top' + (isOpen ? ' top-nav-collapse' : '')}>
    <div className="container">
      <Link href='/'>
        <a className="navbar-brand logo-image">
          <div id='logo-container'>
            <img src={`${process.env.ASSETS_BASE}/assets/lettercms-logo-white.svg`} alt="LetterCMS Logo White"/>
          </div>
        </a> 
      </Link>
      <button onClick={() => setMobileOpen(!mobileOpen)} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-label="Toggle navigation">
        {
          mobileOpen
            ? <Times height='28' fill='white'/>
            : <Bars height='28' fill='white'/>
        }
      </button>
      <div className='collapse navbar-collapse' id="navbarsExampleDefault">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link href='/'>
              <a className="nav-link page-scroll">Home</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href='/blog'>
              <a className="nav-link page-scroll">Blog</a>
            </Link>
          </li>
        </ul>
        <span className="nav-item">
          <Link href='/blog/search'>
            <a className="nav-link page-scroll">
              <img width='1' height='1' src='/pixel.png' alt='LetterCMS Search'/>
              <Search width='28' height='28'/>
            </a>
          </Link>
        </span>
        <span className="nav-item">
          <Link href='https://github.com/lettercms/lettercms'>
            <a className="nav-link page-scroll" target='_blank'>
              <img width='1' height='1' src='/pixel.png' alt='LetterCMS Github'/>
              <Github width='32' height='32'/>
            </a>
          </Link>
        </span>
        <span className="nav-item">
          {
            load &&
            <div className='img-load picture'/>
          }
          {
            !load && !profilePicture &&
            <Button type='outline' alt onClick={() => router.push('/login')}>
              <FormattedMessage id='Log In'/>
            </Button>
          }

          {
            !load && profilePicture &&
            <Link href='/dashboard'>
              <a>
                <img className='picture' src={profilePicture + '?w=38&h=38&q=25'} width={32} height={32} alt='Profile picture'/>
              </a>
            </Link>
          }
        </span>
      </div>
    </div>
    <MobileNav open={mobileOpen}/>
    <style jsx>{`
      .img-load {
        background: var(--load-main);
        animation: bounce .6s ease infinite;
      }
      .picture {
        width: 38px;
        height: 38px;
        border-radius: 50%;
      }
      .navbar-custom {
      background-color: #5f4dee;
      box-shadow: 0 0.0625rem 0.375rem 0 rgba(0, 0, 0, 0.1);
      font: 700 0.875rem/0.875rem "Open Sans", sans-serif;
      transition: all 0.2s;
      }

      .navbar-custom .container {
      max-width: 87.5rem;
      }

      .navbar-custom .navbar-brand.logo-image img {
        width: 4.4375rem;
      }

      .navbar-custom .navbar-brand.logo-text {
      font: 700 2rem/1.5rem "Open Sans", sans-serif;
      color: #fff;;
      text-decoration: none;
      }

      .navbar-custom .navbar-nav {
      margin-top: 0.75rem;
      margin-bottom: 0.5rem;
      }

      .navbar-custom .nav-item .nav-link {
        padding: 0.625rem 0.75rem 0.625rem 0.75rem;
        color: #fff;
        text-decoration: none;
        transition: all 0.2s ease;
      }


      .navbar-custom .nav-item .btn-outline-sm {
      margin-top: 0.25rem;
      margin-bottom: 1.375rem;
      margin-left: 0.5rem;
      border: 0.125rem solid #fff;
      color: #fff;
      }

      .navbar-custom .nav-item .btn-outline-sm:hover {
      background-color: #fff;
      color: #5f4dee;
      }

      .navbar-custom .navbar-toggler {
      padding: 0;
      border: none;
      color: #fff;
      font-size: 2rem;
      }

      @media (min-width: 992px) {
        #logo-container {
          width: 8rem;
          height: 70%;
        }
      .navbar-custom {
        padding: 2.125rem 1.5rem 2.125rem 2rem;
          background: #5f4dee;
        box-shadow: none;
      }

      .navbar-custom .navbar-nav {
        margin-top: 0;
        margin-bottom: 0;
      }

      .navbar-custom .nav-item .nav-link {
        padding: 0.25rem 0.75rem 0.25rem 0.75rem;
      }
      
      .navbar-custom .nav-item .nav-link:hover,
      .navbar-custom .nav-item .nav-link.active {
        opacity: 1;
      }

      .navbar-custom.top-nav-collapse {
        padding: 1rem 1.5rem 0.5rem 2rem;
        background-color: #5f4dee;
        box-shadow: 0 0.0625rem 0.375rem 0 rgba(0, 0, 0, 0.1);
      }

      .navbar-custom.top-nav-collapse .nav-item .nav-link:hover,
      .navbar-custom.top-nav-collapse .nav-item .nav-link.active {
        color: #fff;
      }

      .navbar-custom .nav-item .btn-outline-sm {
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 1rem;
      }
      }
    `}</style>
  </nav>;
}
