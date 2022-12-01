import {useState} from 'react';
import Router from 'next/router';

export default function AsideSearch() {
  const [q, setQ] = useState('');

  return <div className='
    flex
    flex-col
    items-center
    mt-8
    w-4/5
  '>
    <input
      className='
        w-2/3
        border
        border-solid
        border-main-100
        rounded-full
        px-4
        py-2
        text-sm
      '
      type='text'
      value={q}
      onChange={({target: {value}}) => setQ(value)}
      placeholder='Algo interesante'
    />
    <button
      className='
        my-4
        px-4
        py-1
        bg-main-500
        text-white
        rounded-md
        :hover:bg-white
        :hover:text-main-500
      '
      onClick={() => {
        if (!q)
          return alert('Debe introducir un termino de busqueda');

        Router.push(`/search?q=${q}`);
      }}
    >Buscar</button>
  </div>
}