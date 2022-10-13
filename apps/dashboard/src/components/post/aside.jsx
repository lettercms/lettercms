import {useState} from 'react';
import Input from '../input';
import Router from 'next/router';

const Aside = () => {
  const [query, setQuery] = useState('');

  return <aside>
    <form onSubmit={e => {e.preventDefault(); Router.push(`/blog/search?q=${query}`);}}>
      <Input id='search' label='Termino' value={query} onChange={({target: {value}}) => setQuery(value)}/>
      <button className='btn-outline-lg'>Buscar</button>
    </form>
  </aside>;
};

export default Aside;
