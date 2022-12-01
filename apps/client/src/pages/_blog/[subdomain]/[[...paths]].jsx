import dynamic from 'next/dynamic';
import Fallback from '@/components/fallback';
import {captureException} from '@sentry/nextjs';

/*const Post = dynamic(() => import('@/components/post'), {
  ssr: true,
  loading: () => <Fallback/>
});*/

const Home = dynamic(() => import('@/components/home'), {
  ssr: true,
  loading: () => <Fallback/>
});

const isDev = process.env.NODE_ENV !== 'production';

export function getStaticPaths() {
  return {
    paths: [],
    fallback:true
  };
}

export async function getStaticProps({params: {subdomain, paths}}) {
  try {
    let apiPath =  `http${isDev ? '' : 's'}://${isDev ? 'localhost:3002' : `${subdomain}.lettercms.vercel.app`}/api/data/blog?subdomain=${subdomain}`;
    if (paths?.length > 0)
      apiPath += `&paths=${paths.join(',')}`;

    console.log(apiPath);

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
    console.log(err);
    captureException(err);

    return {
      notFound: true
    };
  }
}

export default function PageWraper(props) { 
  let UI = null;

  if (props.type === 'main')
    UI = <Home {...props}/>;/*
  if (props.pathType === 'post')
    UI = <Post {...props}/>;*/

  return UI;
}
