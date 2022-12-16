import Link from 'next/link';
import {useRouter} from 'next/router';
import Search from '@/components/svg/search';
import Github from '@/components/svg/github';
import Button from '@/components/button';
import styles from './mobileNav.module.css';

export default function MobileNav({open}) {
  return <nav className={`${styles.nav} ${open ? '' : styles.collapse}`}>
    <ul className="navbar-nav ml-auto">
      <li>
        <Link href='/'>
          <a className="nav-link page-scroll">HOME</a>
        </Link>
      </li>
      <li>
        <Link href='/blog'>
          <a className="nav-link page-scroll">BLOG</a>
        </Link>
      </li>
    </ul>
    <div className='flex flex-row' style={{width: '10rem', margin: 'auto'}}>
      <span>
        <Link href='/blog/search'>
          <a className="nav-link page-scroll">
            <Search width='28' height='28'/>
          </a>
        </Link>
      </span>
      <span>
        <Link href='https://github.com/lettercms/lettercms'>
          <a className="nav-link page-scroll" target='_blank'>
            <Github width='32' height='32'/>
          </a>
        </Link>
      </span>
    </div>
  </nav>;
}
