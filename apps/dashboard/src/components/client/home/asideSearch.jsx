import {useState} from 'react';
import Router from 'next/router';
import Search from '@lettercms/icons/search';

function doSearch(q) {
  if (!q)
    return alert('Debe introducir un termino de busqueda');

  Router.push(`/search?q=${q}`);
}

export default function AsideSearch() {
  const [q, setQ] = useState('');

  return <div className='
    flex
    flex-col
    items-center
    mt-8
    w-4/5
  '>
    <div
      className='relative'
    >
      <input
        className='
          w-full
          border
          border-solid
          border-main-100
          rounded-full
          px-4
          py-2
          text-sm

          focus:outline-none
        '
        type='text'
        value={q}
        onChange={({target: {value}}) => setQ(value)}
        onKeyUp={({code}) => {
          if (code === 'Enter')
            doSearch(q);
        }}
        placeholder='Algo interesante'
      />
      <Search
        className='absolute right-2 top-2 pointer'
        height='20'
        fill='#362e6f'
        onClick={() => doSearch(q)}
      />
    </div>
  </div>;
}