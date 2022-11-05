import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useState, useEffect, useRef} from 'react';
import Search from '@/components/svg/search';
import Github from '@/components/svg/github';
import Button from '@/components/button';
import Times from '@/components/svg/times';
import Bars from '@/components/svg/bars';
import MobileNav from './mobileNav';

export default function Nav () {
  const prevScrollY = useRef(0);
  const [isOpen, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  
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
            <Image layout='fill' objectFit='contain' src={`${process.env.ASSETS_BASE}/images/lettercms-logo-white-standalone.png`} alt="LetterCMS Logo White"/>          
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
              <a className="nav-link page-scroll">HOME<span className="sr-only">(current)</span></a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href='/blog'>
              <a className="nav-link page-scroll">BLOG</a>
            </Link>
          </li>
          {/*

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle page-scroll" href="#video" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">VIDEO</a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link href="/blog">
                <a className="dropdown-item">
                  <span className="item-text">BLOG</span>
                </a>
              </Link>
              <div className="dropdown-items-divide-hr"></div>
              <Link href="/terminos">
                <a className="dropdown-item">
                  <span className="item-text">TERMS CONDITIONS</span>
                </a>
              </Link>
              <div className="dropdown-items-divide-hr"></div>
              <Link href="/privacidad">
                <a className="dropdown-item">
                  <span className="item-text">PRIVACY POLICY</span>
                </a>
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link href='/pricing'>
              <a className="nav-link page-scroll">PRECIOS</a>
            </Link>
          </li>
          */}
        </ul>
        <span className="nav-item">
          <Button type='outline' alt onClick={() => router.push('/login')}>Iniciar Sesión</Button>
        </span>
        <span className="nav-item">
          <Link href='/blog/search'>
            <a className="nav-link page-scroll">
              <img src='/pixel.png' alt='Search'/>
              <Search width='28' height='28'/>
            </a>
          </Link>
        </span>
        <span className="nav-item">
          <Link href='https://github.com/lettercms/lettercms'>
            <a className="nav-link page-scroll" target='_blank'>
              <img src='/pixel.png' alt='Github'/>
              <Github width='32' height='32'/>
            </a>
          </Link>
        </span>
      </div>
    </div>
    <MobileNav open={mobileOpen}/>
    <style jsx>{`
      #logo-container {
        width: 3rem;
        height: 34px;
        top: 8px;
        position: absolute;
        left: 1.75rem;
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
      height: 1.75rem;
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
      color: #f7f5f5;
      opacity: 0.8;
      text-decoration: none;
      transition: all 0.2s ease;
      }

      .navbar-custom .nav-item .nav-link:hover,
      .navbar-custom .nav-item .nav-link.active {
      color: #fff;
      opacity: 1;
      }

      .navbar-custom .dropdown:hover > .dropdown-menu {
      display: block;
      min-width: auto;
      animation: fadeDropdown 0.2s;
      }

      @keyframes fadeDropdown {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
      }

      .navbar-custom .dropdown-toggle:focus {
      outline: 0;
      }

      .navbar-custom .dropdown-menu {
      margin-top: 0;
      border: none;
      border-radius: 0.25rem;
      background-color: #5f4dee;
      }

      .navbar-custom .dropdown-item {
      color: #f7f5f5;
      opacity: 0.8;
      font: 700 0.875rem/0.875rem "Open Sans", sans-serif;
      text-decoration: none;
      }

      .navbar-custom .dropdown-item:hover {
      background-color: #5f4dee;
      color: #fff;
      opacity: 1;
      }

      .navbar-custom .dropdown-items-divide-hr {
      width: 100%;
      height: 1px;
      margin: 0.75rem auto 0.725rem auto;
      border: none;
      background-color: #c4d8dc;
      opacity: 0.2;
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

      .navbar-custom .dropdown-menu {
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-top: 0.25rem solid rgba(0, 0, 0, 0);
        border-radius: 0.25rem;
      }

      .navbar-custom.top-nav-collapse .dropdown-menu {
        border-top: 0.25rem solid rgba(0, 0, 0, 0);
        box-shadow: 0 0.375rem 0.375rem 0 rgba(0, 0, 0, 0.02);
      }

      .navbar-custom .dropdown-item {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
      }

      .navbar-custom .dropdown-items-divide-hr {
        width: 84%;
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
