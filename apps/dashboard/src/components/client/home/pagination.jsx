'use client'

import {useRouter} from 'next/navigation';

const generateNumbers = (actual, pages, router) => {
  let start = 1;
  let end = 5;
  let tags = [];

  if (actual > 3)
    start = actual - 2;
  if (actual > pages - 2)
    end = pages;
  else
    end = actual + 2;

  for(let i = start; i <= end; i++) {
    if (i === actual)
      tags.push(<div className='w-8 h-8 bg-main-500 text-white flex items-center justify-center rounded mx-1' key={'page-' + 1}>{i}</div>);
    else
      tags.push(<div className='cursor-pointer hover:bg-slate-100 border boder-solid boder-main-500 w-8 h-8 bg-slate-50 flex items-center justify-center rounded mx-1' key={'page-' + i} onClick={() => router.push(`/?page=${i}`)}>{i}</div>);
  }

  return tags;
};

export default function Pagination({pages, actual}) {
  const router = useRouter(); 

  if (pages === 1)
    return null;

  return <div className='flex'>
    {
      actual > 1
        ? <div className='cursor-pointer hover:bg-slate-100 h-8 px-2 flex items-center rounded border boder-solid boder-main-500 bg-slate-50 mr-4' onClick={() => router.push(`/?page=${actual - 1}`)}>Anterior</div>
        : <div/>
    }
    {
      generateNumbers(actual, pages, router)
    }
    {
      actual < pages
        ? <div className='cursor-pointer hover:bg-slate-100 h-8 px-2 flex items-center rounded border boder-solid boder-main-500 bg-slate-50 ml-4' onClick={() => router.push(`/?page=${actual + 1}`)}>Siguiente</div>
        : <div/>
    }
  </div>;
}