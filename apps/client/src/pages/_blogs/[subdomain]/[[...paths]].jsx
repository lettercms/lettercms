import dynamic from 'next/dynamic';
import {captureException} from '@sentry/nextjs';
import Fallback from '@/components/fallback';
import renderTemplate from '@/lib/renderTemplate';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Script from 'next/script';

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
    console.log(err)
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
      {
        props.externalCSS?.map(e => <link key={e} rel='stylesheet' href={e}/>)
      }
      {
        props.css &&
        <style>{props.css}</style>
      }
    </Head>
    <NextSeo {...props.seo} />
     <div dangerouslySetInnerHTML={{__html: props.html}}/>
      {
        props.externalJS?.map(e => {

          let strategy = 'afterInteractive';
          let src = e;

          if (typeof e === 'object') {
            if (!e.lazy) 
              strategy = 'beforeInteractive';

            src = e.src;
          }

          return <Script key={e} src={src} strategy={strategy}/>
      })
      }
      {
        props.js &&
        <Script
          id="lettercms-main-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: props.js}}
        />
      }
   </>
}
