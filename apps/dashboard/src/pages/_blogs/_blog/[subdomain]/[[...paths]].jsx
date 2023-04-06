import dynamic from 'next/dynamic';
import Fallback from '@/components/client/fallback';
import {captureException} from '@sentry/nextjs';

const Post = dynamic(() => import('@/components/client/article'), {
  ssr: true,
  loading: () => <Fallback/>
});

const NotFound = dynamic(() => import('@/pages/404'), {
  ssr: true,
  loading: () => <Fallback/>
});

const Home = dynamic(() => import('@/components/client/home'), {
  ssr: true,
  loading: () => <Fallback/>
});

const isDev = process.env.NODE_ENV !== 'production';

export async function getServerSideProps({query: {subdomain, paths, page = '1'}}) {
  try {
    let apiPath =  `${isDev ? 'http://localhost:3002' : `https://${subdomain}.lettercms.vercel.app`}/api/data/blog?subdomain=${subdomain}&page=${page}`;

    if (paths?.length > 0)
      apiPath += `&paths=${paths.join(',')}`;

    const dataRes = await fetch(apiPath);
    const data = await dataRes.json();

    if (data.type === 'no-blog')
      return {
        redirect: {
          permanent: true,
          destination: 'https://lettercms.vercel.app'
        }
      };

    if (data.type === 'not-found')
      return {
        notFound: true
      };

    return {
      props: data
    };
  } catch(err) {
    captureException(err);

    throw err;
  }
}

export default function PageWraper(props) {
  switch(props.type) {
    case 'main':
      return <Home {...props}/>;
    case 'post':
      return <Post {...props}/>;
    default:
      return <NotFound/>;
  }
}
