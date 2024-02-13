'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {content} from './content.module.css';
import {getGMTDate} from '@lettercms/utils/lib/handleDate';

export default function Content({html, published, tags}) {
  const {asPath} = useRouter();

  useEffect(() => {
    let lazyImages = [].slice.call(document.querySelectorAll('img.lazy-img'));
    let active = false;

    const lazyLoad = () => {
      if (active === false) {
        active = true;

        setTimeout(() => {
          lazyImages.forEach((lazyImage) => {
            const clientRect = lazyImage.getBoundingClientRect();
            if (clientRect.top <= window.innerHeight && clientRect.bottom >= 0) {
              lazyImage.src = lazyImage.dataset.src;

              lazyImage.onload = () => lazyImage.classList.remove('lazy-img');

              lazyImages = lazyImages.filter((image) => image !== lazyImage);

              if (lazyImages.length === 0) {
                document.removeEventListener('scroll', lazyLoad);
                window.removeEventListener('resize', lazyLoad);
                window.removeEventListener('orientationchange', lazyLoad);
              }
            }
          });
          active = false;
        }, 200);
      }
    };

    document.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationchange', lazyLoad);

    return () => {
      document.removeEventListener('scroll', lazyLoad);
      window.removeEventListener('resize', lazyLoad);
      window.removeEventListener('orientationchange', lazyLoad);
      document.getElementById('_code')?.remove();
    };
  }, [asPath]);

  return <div className='w-full container flex flex-col lg:w-2/3 mb-12'>
    <span className='text-main-500 mx-4 mb-8 font-bold text-sm'>{getGMTDate(published)}</span>
    <main
      className={content}
      dangerouslySetInnerHTML={{__html: html}}
    />
    <div className='mx-4'>
      <div className='mb-4'>
        <span className='ml-2 text-sm font-bold text-main-700'>Etiquetas</span>
      </div>
      <ul className='flex flex-wrap'>
        {
          tags.map(e => <li key={e} className='bg-main-500 text-white px-2 py-1 rounded my-1 mx-2'>{e}</li>)
        }
      </ul>
    </div>
  </div>;
}
