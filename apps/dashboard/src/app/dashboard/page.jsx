//import Head from 'next/head';
//import LogoLoad from '@/components/dashboard/logoLoad';
import Welcome from '@/components/dashboard/admin/welcome';
import authOptions from '@/app/nextAuthConfig';
import {getServerSession} from 'next-auth/next';
import {redirect} from 'next/navigation';
import getLanguage from '@/lib/utils/getLanguage';
import getTranslation from '@/lib/utils/getTranslation';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const hl = getLanguage();

  console.log(session)

  if (!session)
    return redirect('/login');

  const {user} = session;

  const translation = await getTranslation(import(`./translation.${hl}.json`), 'landing');

  return <>
    {/*<Head>
      <title>{
        intl.formatMessage({
          id: 'Summary | Dashboard - LetterCMS'
        })
      }</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel= "icon" href="/favicon.ico" />
    </Head>*/}
    <Welcome role={user.role} permissions={user.permissions} name={user.name} firstTime={user.firstTime}/>
  </>;
};