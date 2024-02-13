import {FormattedMessage} from 'react-intl';
import Link from 'next/link';
import {FaSquare} from 'react-icons/fa';

const links = [
  {
    pre: translation => translation['Created by '],
    link: 'David\'s Devel' ,
    href: 'https://facebook.com/davidsdevel'
  },
  {
    pre: translation => translation['Collaborate with us in '],
    link: 'GitHub' ,
    href: 'https://github.com/lettercms'
  },
  {
    pre: translation => translation['Support us in '],
    link: 'Open Collective' ,
    href: 'https://opencollective.com/lettercms'
  }
];

export default function Footer({translation}) {
  return <div className="bg-main-500 flex flex-col text-white text-center">
    <div className='flex flex-col mx-2 md:flex-row'>
      <div className='mt-8 md:w-1/3 md:my-8'>
        <h4 className='text-2xl font-bold my-4'>
          {translation['About LetterCMS']}
        </h4>
        <p>
          {translation['LetterCMS is a system created by David\'s Devel. With the purpose of helping both new and experienced content creators']}
        </p>
      </div>
      <div className='mt-8 md:w-1/3 md:my-8'>
        <h4 className='text-2xl font-bold my-4'>
          {translation['Relevant links']}
        </h4>
        <ul className="w-4/5 m-auto">
        {
          links.map(({pre, link, href}) => {
            return  <li key={link} className='flex items-center'>
              <FaSquare fill='white' style={{width: 8}}/>
              <div className="ml-2">{pre(translation)} <Link href={href} target='_blank'>{link}</Link></div>
            </li>;
          })
        }
        </ul>
      </div>
      <div className="mt-8 md:w-1/3 md:my-8">
        <h4 className='text-2xl font-bold my-4'>
          {translation['Contact']}
        </h4>
        <ul>
          <li>
            <i className="fas fa-map-marker-alt"></i>
            <div className="media-body">22 Innovative, San Francisco, CA 94043, US</div>
          </li>
          <li>
            <div className="media-body">
              <i className="fas fa-envelope"></i>
              <a className="white" href="mailto:lettercms@gmail.com">lettercms@gmail.com</a>
            </div>
          </li>
          <li>
            <div className="media-body">
              <i className="fas fa-globe"></i>
              <a className="white" href="#your-link">www.tivo.com</a>
            </div>
          </li>
        </ul>
      </div> 
    </div>
    <div className='pt-12 pb-4'>
      <p className="p-small">{translation['Developed by ']} <Link href="https://www.facebook.com/davidsdevel" target='_blank'>David&apos;s Devel</Link></p> 
    </div>
  </div>;
};
