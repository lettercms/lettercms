import Home from 'react-icons/home';
import {FaAngleDoubleRight} from 'react-icons/fa';
import Link from 'next/link';

export default function Breadcrumbs({title}) {
  return <div className='absolute flex w-full bottom-0 items-center px-4 md:px-8 lg:px-12'>
    <Link href='/'>
      <Home height='28' fill='#362e6f'/>
    </Link>
    <FaAngleDoubleRight height='20' className='mx-2' fill='#837bbf'/>
    <span className='font-bold text-main-700'>{title}</span>
  </div>;
}
