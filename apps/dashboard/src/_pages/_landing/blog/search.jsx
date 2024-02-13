import {useState, useEffect, useRef} from 'react';
import sdk from '@lettercms/sdk';
import jwt from 'jsonwebtoken';
import {useRouter} from 'next/navigation';
import {getSession} from 'next-auth/react';
import Input from '@/components/input';
import Button from '@/components/button';
import Card from '@/components/landing/blog/card';
import Head from 'next/head';
import {ImSpinner9} from 'react-icons/im';
import {Layout} from '@/components/landing/layout';
import {captureException} from '@sentry/nextjs';

const Search = ({q}) => {
  const [query, setQuery] = useState(q);
  const [data, setData] = useState([]);

  const prevSearch = useRef(null);

  const [isLoading, setLoad] = useState(!!q);
  //const [hasMore, setHasMore] = useState(false);
  const router = useRouter();

  const doSearch = query !== prevSearch.current;

  useEffect(() => {
    if (doSearch && query) {
        setLoad(true);
        setData([]);

        sdk.posts.search(query, {
          fields: [
            'url',
            'description',
            'title',
            'fullUrl',
            'thumbnail',
            'comments'
          ]
        })
        .then(({data/*, paging*/}) => {
          /*if (paging.cursors.before)
            setHasMore(true);
          else
            setHasMore(false);*/

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

  return <div id='search-container' className='w-full'>
    <Head>
      <title>{`Busqueda ${q ? `"${q}" ` : ''}| LetterCMS`}</title>
    </Head>
    <img src={`${process.env.ASSETS_BASE}/assets/no-search.svg`} className='mt-12 mx-auto w-full max-w-2xl' alt=''/>
    <div className='px-4 max-w-xl mx-auto'>
      <form onSubmit={e => {e.preventDefault(); if (!query) {return;} router.push(`/blog/search?q=${query}`);}} className='flex flex-col items-center'>
        <Input id='q' value={query} onChange={({target: {value}}) => setQuery(value)} label='Término'/>
        <Button type='outline' alt className='mt-4 w-48'>Buscar</Button>
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
        <div className='w-full flex justify-center'>
          <ImSpinner9 className='animate-spin' width='80'/>
        </div>
      }
    </div>
  </div>;
};

export const getServerSideProps = async ({req, query}) => {
  try {
    const {hl = 'en', q} = query;
    const session = await getSession({req});
    const lang = await import(`@/translations/search/${hl}.json`);

    const messages = Object.assign({}, lang.default);

    return {
      props: {
        session,
        messages,
        //TODO: implement SDK token generation
        accessToken: jwt.sign({subdomain: 'davidsdevel'}, process.env.JWT_AUTH),
        q: q || null,
        referrer: req?.headers?.referer ?? ''
      }
    };
  } catch(err) {
    captureException(err);

    throw err;
  }
};

export default function PostLayout({session, accessToken, referrer, ...e}) {
  return <Layout session={session} accessToken={accessToken} referrer={referrer}>
    <Search {...e}/>
  </Layout>;
};
