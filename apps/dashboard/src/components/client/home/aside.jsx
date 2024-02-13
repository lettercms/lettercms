import {useMemo} from 'react';

import Card from './asideCard';
import Search from './asideSearch';
import Categories from './asideCategories';
import Author from './asideAuthor';


export default function Aside({entries, tags, categories, author}) {
  const _tags = useMemo(() => Object.entries(tags).filter(([, val]) => val), [tags]);
  const _cats = useMemo(() => Object.entries(categories).map(([name, value]) => {
    const capitalize = name.split(/\s+/).map(e => e[0].toUpperCase() + e.slice(1).toLowerCase()).join(' ');

    return [
      capitalize,
      value
    ];
  }), [categories]);

  return <aside className='flex flex-col w-full lg:w-1/3 bg-slate-50 py-8 items-center rounded-lg h-fit'>
    <Search/>
    {
      author && 
      <Author {...author}/>
    }
    {
      entries?.length > 0 &&
      <>
        <hr className='w-3/4 my-8'/>
        <div className='w-full text-center mb-4'>
          <span className='font-bold text-sm text-main-700'>Entradas Populares</span>
        </div>
        {entries.map(e => <Card key={e._id} {...e}/>)}
      </>
    }
    {
      _cats.length > 0 &&
      <>
        <hr className='w-3/4 my-8'/>
        <Categories categories={_cats}/>
      </>
    }
    {
      _tags.length > 0 && <>
        <hr className='w-3/4 my-8'/>
        <div className='w-4/5 text-center'>
          <span className='font-bold text-sm text-main-700'>Etiquetas</span>
          <ul className='flex mx-auto flex-wrap mt-4'>
            {
              _tags.map(([key, value]) => <li key={`tag-${key}`} className='m-1 p-1 text-left bg-main-500 text-white rounded-lg'>{key} ({value})</li>)
            }
          </ul>
        </div>
      </>
    }
  </aside>; 
}