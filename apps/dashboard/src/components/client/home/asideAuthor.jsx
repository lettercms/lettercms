import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin} from 'react-icons/fa';
import Link from 'next/link';

export default function Author({name, lastname, photo, ocupation, description, facebook, twitter, linkedin, instagram, website}) {
  return <>
    <hr className='w-3/4 my-8'/>
    <div
      className='
      flex
      flex-col
      items-center'
    >
      <img src={photo + '?w=165&h=165&q=50'} className='rounded-full w-40 h-40'/>
      <div className='mt-4 mb-2'>
        <span className='font-bold text-sm text-main-700'>{name} {lastname}</span>
      </div>
      <div>
        <span className='my-2 text-xl text-main-500'>{ocupation}</span>
      </div>
      <p className='mt-4 px-8 text-center'>{description}</p>
      <div className='flex margin-auto justify-between w-2/3 mt-8'>
        {
          facebook && 
          <Link target='_blank' href={facebook}>
            <FaFacebook height='28'/>
          </Link>
        }
        {
          twitter && 
          <Link target='_blank' href={twitter}>
            <FaTwitter height='28'/>
          </Link>
        }
        {
          instagram && 
          <Link target='_blank' href={instagram}>
            <FaInstagram height='28'/>
          </Link>
        }
        {
          linkedin && 
          <Link target='_blank' href={linkedin}>
            <FaLinkedin height='28'/>
          </Link>
        }
      </div>
    </div>
  </>;
}
