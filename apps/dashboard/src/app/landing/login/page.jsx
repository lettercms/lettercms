import UI from '@/components/landing/login';
import getLanguage from '@/lib/utils/getLanguage';
import getTranslation from '@/lib/utils/getTranslation';
import authOptions from '@/app/nextAuthConfig';
import {getServerSession} from 'next-auth/next';

export default async function Login() {
  const session = await getServerSession(authOptions);
  console.log(session); 
  
  const hl = getLanguage();
  const translation = await getTranslation(import(`./translation.${hl}.json`), 'login');


  return <UI translation={translation}/>
}
