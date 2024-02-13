import Head from '@/components/landing/head';
import {getSession} from 'next-auth/react';
import {Layout} from '@/components/landing/layout';
import jwt from 'jsonwebtoken';
import Header from '@/components/landing/index/header';
import Description from '@/components/landing/index/description';
import Features from '@/components/landing/index/features';
import Details from '@/components/landing/index/details';
import Newsletter from '@/components/landing/index/newsletter';
import CTA from '@/components/landing/index/cta';

function Home() {
  return <div className='bg-main-500'>
    <Head/>
    <Header />
    <Description/>
    <Features/>
    <Details/>
    <Newsletter/>
    <CTA/>
  </div>;
}

export default function HomeLayout({session, accessToken, referrer}) {
  return <Layout session={session} accessToken={accessToken} referrer={referrer}>
    <Home/>
  </Layout>;
}

export async function getServerSideProps({req, query}) {
  const session = await getSession({req});
  const {hl = 'en'} = query;

  const messages = await import(`@/translations/index/${hl}.json`);

  return {
    props: {
      messages: Object.assign({}, messages.default),
      referrer: req?.headers.referer || null,
      accessToken: jwt.sign({subdomain: 'davidsdevel'}, process.env.JWT_AUTH),
      session
    }
  };
}
