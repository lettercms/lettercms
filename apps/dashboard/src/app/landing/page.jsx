import Header from '@/components/landing/index/header';
import getLanguage from '@/lib/utils/getLanguage';
import getTranslation from '@/lib/utils/getTranslation';
import Description from '@/components/landing/index/description';
import Features from '@/components/landing/index/features';
import Details from '@/components/landing/index/details';
import Newsletter from '@/components/landing/index/newsletter';
import CTA from '@/components/landing/index/cta';

/*
import {Layout} from '@/components/landing/layout';
*/

export default async function Home() {
  const hl = getLanguage();

  const translation = await getTranslation(import(`./translation.${hl}.json`), 'landing');

  return <div className='bg-main-500'>
    <Header translation={translation}/>
    <Description translation={translation}/>
    <Features translation={translation}/>
    <Details translation={translation}/>
    <Newsletter translation={translation}/>
    <CTA translation={translation}/>
  </div>;
}

/*export default async function HomeLayout({session, accessToken, referrer}) {
  return <Layout session={session} accessToken={accessToken} referrer={referrer}>
    <Home/>
  </Layout>;
}*/


/*async function getProps() {
  const session = await getSession({req});
  const {hl = 'en'} = query;


  //getTRanslation('/index', hl);

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
*/