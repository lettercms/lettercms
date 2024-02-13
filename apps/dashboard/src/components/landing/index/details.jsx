'use client'

import Button from '@/components/button';
import {useRouter} from 'next/navigation';
import {FaSquare} from 'react-icons/fa';
import Container from '@/components/container';

export default function Details({translation}) {
  const router = useRouter();

  return <div id="details" className="bg-slate-50 py-12">
    <Container className='bg-white m-auto flex flex-col items-center'>
      <div className="text-center max-w-2xl">
        <img className="max-w-md m-auto w-full" src={`${process.env.ASSETS_BASE}/illustrations/489.svg`} alt="alternative"/>
        <h3 className='mt-8 font-bold text-2xl text-main-700'>
          {translation['It\'s time to improve your content creation']}
        </h3>
        <p className='my-12'>
          {translation['Our goal is for you to grow and deliver your content in the best possible way. With LetterCMS you won\'t have to add plugins or use external tools, we offer everything in one place.']}
        </p>
        <ul>
          <li className="flex text-left">
            <FaSquare fill='#837bbf' style={{marginTop: 4, marginRight: 4, width: 8}}/>
            <div>
              {translation['Attract new readers and offer them quality']}
            </div>
          </li>
          <li className="flex text-left">
            <FaSquare fill='#837bbf' style={{marginTop: 4, marginRight: 4, width: 8}}/>
            <div>
              {translation['Create and collab more efficiently']}
            </div>
          </li>
        </ul>
        <Button type='solid' className='mt-12' onClick={() => router.push('/signin')}>
          {translation["REGISTER"]}
        </Button>
      </div>
    </Container>
  </div>;
}