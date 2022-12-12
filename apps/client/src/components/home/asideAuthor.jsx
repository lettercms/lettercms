import Facebook from '@lettercms/icons/facebook';
import Twitter from '@lettercms/icons/twitter';
import Instagram from '@lettercms/icons/instagram';
import Linkedin from '@lettercms/icons/linkedin';
import Link from 'next/link';

export default function Author({name, lastname, photo, ocupation, description, facebook, twitter, linkedin, instagram, website}) {
  return<>
    <hr className='w-3/4 my-8'/>
    <div
      className='
      flex
      flex-col
      items-center'
    >
      <img src={photo} className='rounded-full'/>
      <div className='mt-4 mb-2'>
        <span className='font-bold text-sm text-main-700'>{name} {lastname}</span>
      </div>
      <div>
        <span className='my-2 text-lg'>{ocupation}</span>
      </div>
      <p className='mt-4 px-8 text-center'>{description}</p>
      <div className='flex margin-auto justify-between w-2/3 mt-8'>
        {
          facebook && 
          <Link href={facebook}>
            <a target='_blank'>
              <Facebook height='28'/>
            </a>
          </Link>
        }
        {
          twitter && 
          <Link href={twitter}>
            <a target='_blank'>
              <Twitter height='28'/>
            </a>
          </Link>
        }
        {
          instagram && 
          <Link href={instagram}>
            <a target='_blank'>
              <Instagram height='28'/>
            </a>
          </Link>
        }
        {
          linkedin && 
          <Link href={linkedin}>
            <a target='_blank'>
              <Linkedin height='28'/>
            </a>
          </Link>
        }

      </div>
    </div>
  </>;
}
