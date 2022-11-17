import {useState, useEffect} from 'react';
import {getSearch} from '@/lib/mongo/search';
import sdk from '@lettercms/sdk';
import Router from 'next/router';
//import Input from '@/components/input';
import Card from '@/components/index/card';
import Head from 'next/head';

const Search = ({q, accessToken}) => {
  const [query, setQuery] = useState(q);
  const [data, setData] = useState([]);
  const [isLoading, setLoad] = useState(!!q);
  const [hasMore, setHasMore] = useState(false);

  const _sdk = new sdk.Letter(accessToken);

  const doSearch = async () => {
    try {
      setLoad(true);
      setData([]);

      const {data, paging} = await _sdk.posts.search(q, {
        fields: [
          'url',
          'description',
          'title',
          'fullUrl',
          'thumbnail',
          'comments'
        ]
      });

      if (paging.cursors.before)
        setHasMore(true);
      else
        setHasMore(false);

      setData(data);
    } catch(err) {
      throw err;
      
      alert('Error al obtener datos');
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    doSearch();
  }, [q]);

  const hasPosts = data.length > 0;

  return <div id='search-container'>
    <Head>
      <title>Busqueda {q ? `"${q}" ` : ''}| LetterCMS</title>
    </Head>
    <img src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/no-search.svg' id='search-img'/>
    <div id='form-container'>
      <form onSubmit={e => {e.preventDefault(); if (!query) {return;}Router.push(`/search?q=${query}`);}}>
        <input id='q' value={query} onChange={({target: {value}}) => setQuery(value)} placeholder='Termino'/>
        <button className='btn-outline-lg'>Buscar</button>
      </form>
    </div>
    <div>
      {
        !hasPosts && !isLoading && q && <span>No se encrontraron entradas con el termino &quot;<b>{q}</b>&quot;</span> 
      }
      {
        hasPosts && !isLoading &&
        data.map(e =>  <Card key={`blog-index-${e.title}`} ID={e._id} content={e.description} {...e}/>)

      }
      {
        isLoading &&
        <img id='spinner' src='/assets/spinner-black.svg'/>
      }
    </div>
    <style jsx>{`
      :global(body) {
        height: auto !important;
      }
      #search-container {
        margin-top: 8rem;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      #search-container #search-img {
        margin-bottom: -80px;
        margin-top: -70px;
        width: 30rem;
      }
      #search-container #form-container {
        width: 30rem;
      }
      span {
        display: block;
        margin-top: 2rem;
      }
      #spinner {
        width: 5rem;
        animation: rotation linear .6s infinite;
      }
    `}</style>
  </div>;
};

export async function getServerSideProps(ctx) {
  const searchData = await getSearch(ctx);

  return searchData;
}

export default Search;
