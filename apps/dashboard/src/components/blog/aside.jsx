import {useState} from 'react';
import Base from '@/components/admin/stats/base';
import Input from '@/components/input';
import FacebookIcon from '@/components/svg/facebook';
import InstagramIcon from '@/components/svg/instagram';
import LinkedinIcon from '@/components/svg/linkedin';
import TwitterIcon from '@/components/svg/twitter';
import WebsiteIcon from '@/components/svg/website';
import Link from 'next/link';
import {useRouter} from 'next/router';
import MostViewed from './mostViewed';
import Button from '@/components/button';

export default function Aside({owner, mostViewed}) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  return <aside>
    <Base row={1} principal>
      <div id='query-container'>
        <Input label='Termino' value={query} onChange={e => setQuery(e.target.value)} id='query'/>
        <Button type='outline' alt onClick={() => router.push(`/search?q=${query}`)}>Buscar</Button>
      </div>
    </Base>
    <Base row={1}>
      <div id='user-container' className='flex flex-column'>
        <div>
          <img width='160' height='160' id='user-picture' src={owner.photo + '?w=160&h=160&q=50'} alt={`${owner.name} ${owner.lastname} profile picture - LetterCMS`} />
        </div>
        <div>
          <span className='user-name'>{owner.name} {owner.lastname}</span>
          <p>{owner.description}</p>
          <div>
            <ul className='flex flex-row'>
              {
                owner.website &&
                <li>
                  <Link href={owner.website}>
                    <a target='_blank'>
                      <img width='1' height='1' src='/pixel.png' alt={`${owner.name} ${owner.lastname} Website - LetterCMS`}/>
                      <WebsiteIcon fill='#555' width='28'/>
                    </a>
                  </Link>
                </li>
              }
              {
                owner.facebook &&
                <li>
                  <Link href={owner.facebook}>
                    <a target='_blank'>
                      <img width='1' height='1' src='/pixel.png' alt={`${owner.name} ${owner.lastname} Facebook - LetterCMS`}/>
                      <FacebookIcon width='28'/>
                    </a>
                  </Link>
                </li>
              }
              {
                owner.instagram &&
                <li>
                  <Link href={owner.instagram}>
                    <a target='_blank'>
                      <img width='1' height='1' src='/pixel.png' alt={`${owner.name} ${owner.lastname} Instagram - LetterCMS`}/>
                      <InstagramIcon width='28'/>
                    </a>
                  </Link>
                </li>
              }
              {
                owner.twitter &&
                <li>
                  <Link href={owner.twitter}>
                    <a target='_blank'>
                      <img width='1' height='1' src='/pixel.png' alt={`${owner.name} ${owner.lastname} Twitter - LetterCMS`}/>
                      <TwitterIcon width='28'/>
                    </a>
                  </Link>
                </li>
              }
              {
                owner.linkedin &&
                <li>
                  <Link href={owner.linkedin}>
                    <a target='_blank'>
                      <img width='1' height='1' src='/pixel.png' alt={`${owner.name} ${owner.lastname} Linkedin - LetterCMS`}/>
                      <LinkedinIcon width='28'/>
                    </a>
                  </Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </Base>
    <Base row={1} title='Más vistos'>
      <div className='flex flex-column'>
        <MostViewed mostViewed={mostViewed}/>
      </div>
    </Base>
    <style jsx>{`
      aside {
        display: none;
      }
      ul {
        width: 100%;
        padding: 1rem 10% 0;
      }
      ul li {
        list-style: none;
      }
      @media screen and (min-width: 720px) {
        #user-picture {
          width: 160px;
          border-radius: 50%;
          margin-bottom: 1rem;
        }
        .user-name {
          font-weight: bold;
        }
        aside {
          display: block;
          width: 30%;
          margin-top: 35px;
        }
        #query-container {
          display: flex;
          flex-direction: column;
        }
      }
    `}</style>
  </aside>;
}
