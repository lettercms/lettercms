import {content} from './content.module.css';
import {getGMTDate} from '@lettercms/utils/lib/handleDate';

export default function Content({html, published, tags}) {
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
      <ul className='flex'>
        {
          tags.map(e => <li key={e} className='bg-main-500 text-white px-2 py-1 rounded mx-2'>{e}</li>)
        }
      </ul>
    </div>
  </div>;
}
