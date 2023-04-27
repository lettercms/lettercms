import {FormattedMessage} from 'react-intl';
import {useState} from 'react';
import Container from '@/components/container';
import Input from '@/components/input';
import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaLink} from 'react-icons/fa';
import Link from 'next/link';
import {useRouter} from 'next/router';
import MostViewed from './mostViewed';
import Button from '@/components/button';

export default function Aside({owner, mostViewed}) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  return <aside className='w-full bg-slate-100 flex flex-col items-center md:w-1/3 md:rounded-xl md:h-fit'>
    <Container>
      <div className='flex flex-col items-center'>
        <Input label={<FormattedMessage id='Term'/>} value={query} onChange={e => setQuery(e.target.value)} className='mb-4'/>
        <Button type='solid' onClick={() => router.push(`/search?q=${query}`)}>
          <FormattedMessage id='Search'/>
        </Button>
      </div>
    </Container>
    <Container>
      <div id='user-container' className='flex flex-col items-center'>
        <div className='w-40 h-40'>
          <img width='160' height='160' className='rounded-full' src={owner.photo /*+ '?w=160&h=160&q=50'*/} alt={`${owner.name} ${owner.lastname} profile picture - LetterCMS`} />
        </div>
        <div className='flex flex-col items-center text-center'>
          <span className='text-xl font-bold my-4'>{owner.name} {owner.lastname}</span>
          <p>{owner.description || 'Este es un texto de relleno porque me da demasiada flojera escribir algo simple y sencillo describiendo y explicando acerca de mi'}</p>
            <ul className='flex justify-between w-4/5 mt-4'>
              {
                !owner.website &&
                <li>
                  <Link target='_blank' href={owner.website || '/'}>
                    <img width='1' height='1' src='/pixel.png' alt={`${owner.name} ${owner.lastname} Website - LetterCMS`}/>
                    <FaLink fill='#555' style={{height: 24, width: 24}}/>
                  </Link>
                </li>
              }
              {
                !owner.facebook &&
                <li>
                  <Link target='_blank' href={owner.facebook || '/'}>
                      <img width='1' height='1' src='/pixel.png' alt={`${owner.name} ${owner.lastname} Facebook - LetterCMS`}/>
                      <FaFacebook style={{height: 24, width: 24}}/>
                  </Link>
                </li>
              }
              {
                !owner.instagram &&
                <li>
                  <Link target='_blank' href={owner.instagram || '/'}>
                      <img width='1' height='1' src='/pixel.png' alt={`${owner.name} ${owner.lastname} Instagram - LetterCMS`}/>
                      <FaInstagram style={{height: 24, width: 24}}/>
                  </Link>
                </li>
              }
              {
                !owner.twitter &&
                <li>
                  <Link target='_blank' href={owner.twitter || '/'}>
                      <img width='1' height='1' src='/pixel.png' alt={`${owner.name} ${owner.lastname} Twitter - LetterCMS`}/>
                      <FaTwitter style={{height: 24, width: 24}}/>
                  </Link>
                </li>
              }
              {
                !owner.linkedin &&
                <li>
                  <Link target='_blank' href={owner.linkedin || '/'}>
                      <img width='1' height='1' src='/pixel.png' alt={`${owner.name} ${owner.lastname} Linkedin - LetterCMS`}/>
                      <FaLinkedin style={{height: 24, width: 24}}/>
                  </Link>
                </li>
              }
            </ul>
        </div>
      </div>
    </Container>
    <Container row={1} title={<FormattedMessage id='Most viewed'/>}>
      <div className='flex flex-col'>
        <MostViewed mostViewed={mostViewed}/>
      </div>
    </Container>
  </aside>;
}
