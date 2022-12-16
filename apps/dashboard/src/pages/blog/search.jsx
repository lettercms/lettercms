import {useState, useEffect, useRef} from 'react';
import sdk from '@lettercms/sdk';
import {useRouter} from 'next/router';
import Input from '@/components/input';
import Card from '@/components/blog/card';
import Head from 'next/head';
import Spinner from '@/components/svg/spinner';

const _sdk = new sdk.Letter(process.env.TRACK_TOKEN);

const Search = ({q}) => {
  const [query, setQuery] = useState(q);
  const [data, setData] = useState([]);

  const prevSearch = useRef(null);

  const [isLoading, setLoad] = useState(!!q);
  const [hasMore, setHasMore] = useState(false);
  const router = useRouter();

  const doSearch = query !== prevSearch.current;

  useEffect(() => {
    if (doSearch && query) {
        setLoad(true);
        setData([]);

        _sdk.posts.search(query, {
          fields: [
            'url',
            'description',
            'title',
            'fullUrl',
            'thumbnail',
            'comments'
          ]
        })
        .then(({data, paging}) => {
          if (paging.cursors.before)
            setHasMore(true);
          else
            setHasMore(false);

          setData(data);

          prevSearch.current = query;

          setLoad(false);
        })
        .catch(err => {
          throw err;
          alert('Error al obtener datos');

          setLoad(false);
        });
    }
  }, [query, doSearch]);

  const hasPosts = data.length > 0;

  return <div id='search-container'>
    <Head>
      <title>Busqueda {q ? `"${q}" ` : ''}| LetterCMS</title>
    </Head>
    <img src='/assets/no-search.svg' id='search-img' alt=''/>
    <div id='form-container'>
      <form onSubmit={e => {e.preventDefault(); if (!query) {return;} router.push(`/blog/search?q=${query}`);}}>
        <Input id='q' value={query} onChange={({target: {value}}) => setQuery(value)} label='Termino'/>
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
        <div id='spinner'>
          <Spinner width='80'/>
        </div>
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
        animation: rotation linear .6s infinite;
      }
    `}</style>
  </div>;
};

Search.getInitialProps = async ({req, res, query: {q}}) => {
  return {
    q
  };
};

export default Search;
