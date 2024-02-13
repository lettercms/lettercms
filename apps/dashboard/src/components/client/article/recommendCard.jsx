'use client'

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {FaComments, FaShare} from 'react-icons/fa';
import ShareButtons from '../shareButtons';

export default function RecommendCard({title, description, thumbnail, url, author, tags, comments}) {
  const [showShare, setShowShare] = useState(false);

  const router = useRouter()

  return <div className='my-8 w-full lg:w-2/5 relative h-fit'>
    <Link href={`/${url}`}>
      <div className='rounded-lg w-full h-48 bg-cover bg-center' style={{backgroundImage: `url(${thumbnail}&w=550&q=75)`}}/>
    </Link>
    <div>
      <h5 className='font-bold my-8 text-center text-main-700'>{title}</h5>
    </div>
    <p>{description}</p>
    <div>
      <ul className='flex flex-wrap my-2'>
        {
          tags.map(key => <li key={url + key} className='my-1 px-2 py-1 mx-2 text-sm font-bold bg-main-500 rounded text-white'>{key}</li>)
        }
      </ul>
      <div className='flex justify-between mt-2'>
        <div className='flex items-center'>
          <FaComments height='24' fill='#362e6f'/>
          <span className='ml-2'>{comments}</span>
        </div>
        <div className='flex items-center'>
          <span className='font-bold text-sm text-main-700'>{author.name} {author.lastname}</span>
          <img src={author.photo + '?w=50&h=50&q=50'} className='rounded-full h-12 ml-2'/>
        </div>
      </div>
      <div className='flex items-center mt-4'>
        <button className='cursor-pointer w-full mr-8 border border-solid border-main-500 py-2 text-main-500 rounded-full hover:text-white hover:bg-main-500' onClick={() => router.push('/' + url)}>Ver Más</button>
        <button onFocus={() => setShowShare(true)} onBlur={() => setShowShare(false)}>
          <FaShare height='28' fill='#362e6f'/>
        </button>
      </div>
    </div>
    <ShareButtons show={showShare} title={title} url={url}/>
  </div>;
}
