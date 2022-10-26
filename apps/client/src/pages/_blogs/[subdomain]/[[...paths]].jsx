import dynamic from 'next/dynamic';
import {captureException} from '@sentry/nextjs';
import Fallback from '@/components/fallback';
import renderTemplate from '@/lib/renderTemplate';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

export async function getServerSideProps({params: {subdomain, paths}}) {
  try {
    /*const pathType = await getPathType(subdomain, paths);

    if (pathType === 'no-blog')
      return {
        redirect: {
          permanent: true,
          destination: 'https://lettercms.vercel.app'
        }
      };

    //TODO: get data processing config
    //TODO: add data processing

    let props = null;
    
    if (pathType === 'main')
      props = await getBlog(subdomain);
    if (pathType === 'post')
      props = await getPost(subdomain, paths);
    if (pathType === 'not-found')
      return {
        notFound: true
      };*/

    const props = await renderTemplate('main', '');

    return {
      props
    };
  } catch(err) {
    captureException(err);
    return {
      props: {}
    }
  }
}

export default function PageWraper(props) { 
  //TODO: add link event listener with next router
  return <>
    <Head>
      {props.externalCSS.map(e => {
        return <link key={e} rel='stylesheet' href={e}/>
      })}
      <style>{props.css}</style>
    </Head>
    <NextSeo {...props.seo} />
     <div dangerouslySetInnerHTML={{__html: props.html}}/>
   </>
}
