import Link from 'next/link';
import {FaAngleDoubleRight} from 'react-icons/fa';

const Breadcrumbs = ({title}) => {
  return <div className="py-8 px-2">
    <div className="flex items-center">
      <Link href="/blog">Blog</Link>
      <FaAngleDoubleRight className='text-gray-400 h-4 w-4 m-2'/>
      <span>{title}</span>
    </div>
  </div>;
};

export default Breadcrumbs;
