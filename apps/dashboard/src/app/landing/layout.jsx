import getLanguage from '@/lib/utils/getLanguage';
import getTranslation from '@/lib/utils/getTranslation';
import {Layout} from '@/components/landing/layout';
import jwt from 'jsonwebtoken';

export default async function LandingLayout({children}) {
  //TODO: Get session
  const hl = getLanguage();

  const translation = await getTranslation(import(`./translation.${hl}.json`), 'landing');
  const accessToken = jwt.sign({subdomain: 'davidsdevel'}, process.env.JWT_AUTH);

  return <Layout translation={translation} accessToken={accessToken}>
    {children}
  </Layout>
}
