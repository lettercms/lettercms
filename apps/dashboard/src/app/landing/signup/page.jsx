import UI from '@/components/landing/signup';
import getLanguage from '@/lib/utils/getLanguage';
import getTranslation from '@/lib/utils/getTranslation';

export default async function Login() {
  const hl = getLanguage();
  const translation = await getTranslation(import(`./translation.${hl}.json`), 'signup');

  return <UI translation={translation}/>
}
