import Head from '../components/head';
import Header from '../components/index/header';
import Description from '../components/index/description';
import Features from '../components/index/features';
import Details from '../components/index/details';
import Video from '../components/index/video';
//import Pricing from '../components/index/pricing';
import Newsletter from '../components/index/newsletter';
import Footer from '../components/index/footer';
import {useEffect} from 'react';
import sdk from '@lettercms/sdk';
import {getSession} from 'next-auth/react';
import {useToken} from '@/lib/userContext';
import jwt from 'jsonwebtoken';

export default function Home({referrer, isAdmin}) {
  const {accessToken} = useToken();

  useEffect(() => {
    if (!isAdmin) {
      const sdkToken = new sdk.Letter(accessToken);

      sdkToken.stats.setView('/', referrer);
    }
  }, [accessToken, isAdmin, referrer]);

  return <div>
      <Head/>
      <Header />
      <Description/>
      <Features/>
      <Details/>
      {/*<Pricing/>*/}
      <Newsletter/>
      <Video/>
      <Footer/>
    </div>;
}

export async function getServerSideProps({req, res, query}) {
  const session = await getSession({req});
  const {hl = 'en'} = query;

  const isAdmin = !!session;

  const messages = await import(`@/translations/index/${hl}.json`);

  return {
    props: {
      messages: Object.assign({}, messages.default),
      referrer: req?.headers.referer || null,
      isAdmin,
      accessToken: jwt.sign({subdomain: 'davidsdevel'}, process.env.JWT_AUTH)
    }
  };
}