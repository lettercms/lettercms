import {FormattedMessage} from 'react-intl';
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import {useState, useEffect, useRef} from 'react';
import {useSession} from 'next-auth/react';
import Button from '@/components/button';
import {FaBars, FaTimes, FaGithub, FaSearch} from 'react-icons/fa';
import sdk from '@lettercms/sdk';

export default function Nav () {
  const [profilePicture, setProfilePicture] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [load, setLoad] = useState(true);
  
  const prevScrollY = useRef(0);

  const router = Router.useRouter();
  const {status, data} = useSession();

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => setMobileOpen(false));
  }, []);

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

  return <>
    <nav className={`z-20 left-0 top-0 fixed transition-all duration-300 ease w-full bg-white px-4 ${isOpen ? 'py-2' : 'py-4'}`}>
      <div className="flex w-full justify-between">
        <Link href='/'>
          <img src={`${process.env.ASSETS_BASE}/assets/lettercms-logo.svg`} alt="LetterCMS Logo White" className={isOpen ? 'h-8' : 'h-12'}/> 
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="z-20" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-label="Toggle navigation">
          {
            mobileOpen
              ? <FaTimes height='28' fill='#5f4dee'/>
              : <FaBars height='28' fill='#5f4dee'/>
          }
        </button>
        <div className={`fixed transition-all duration-300 ease w-full h-full bg-white top-0 flex flex-col justify-center items-center text-main-500 ${mobileOpen ? 'left-0' : '-left-full'}`}>
          <img src={`${process.env.ASSETS_BASE}/assets/lettercms-logo.svg`} alt="LetterCMS Logo White" className='h-12 mb-8'/>
          <div className='flex flex-col text-xl items-center'>
            <span className='my-4'>
              <Link href='/'>
                Inicio
              </Link>
            </span>
            <span className='my-4'>
              <Link href='/blog'>
                Blog
              </Link>
            </span>
          </div>
          <div className='flex my-4 w-32 justify-between'>
            <span>
              <Link href='/blog/search'>
                <img width='1' height='1' src='/pixel.png' alt='LetterCMS Search'/>
                <FaSearch width='28' height='28' fill='#5f4dee'/>
              </Link>
            </span>
            <span>
              <Link target='_blank' href='https://github.com/lettercms/lettercms'>
                <img width='1' height='1' src='/pixel.png' alt='LetterCMS Github'/>
                <FaGithub width='32' height='32' fill='#5f4dee'/>
              </Link>
            </span>
          </div>
          <span>
            {
              load &&
              <div className='img-load picture'/>
            }
            {
              !load && !profilePicture &&
              <Button type='outline' alt className='my-4' onClick={() => {
                router.push('/login');
              }}>Login</Button>
            }

            {
              !load && profilePicture &&
              <Link href='/dashboard'>
                <img className='picture' src={profilePicture + '?w=38&h=38&q=25'} width={32} height={32} alt='Profile picture'/>
                <span>{`${data.user.name} ${data.user.lastname}`}</span>
              </Link>
            }
          </span>
        </div>
      </div>
    </nav>
    <div className='fixed bg-white w-full text-center bottom-0 py-2 px-1 text-sm z-10'>
      <span>Project still in development. You can collaborate on <a className='text-main-500' target='_blank' href='https://github.com/lettercms/lettercms' rel="noreferrer">GitHub</a> or support us on <a className='text-main-500' target='_blank' href='https://opencollective.com/lettercms' rel="noreferrer">Open Collective</a></span>
    </div>
  </>;
}
