import Head from 'next/head';
import {useIntl} from 'react-intl';
import {getSession} from 'next-auth/react';
import {DashboardProvider} from '@/components/dashboard/layout';
import LogoLoad from '@/components/dashboard/logoLoad';
import dynamic from 'next/dynamic';

const Welcome = dynamic(() => import('@/components/dashboard/admin/welcome'), {
  ssr: false,
  loading:LogoLoad
});

export async function getServerSideProps({req, query}) {
  const {hl} = query;
  const session = await getSession({req});

  if (!session)
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    };

  const messages = await import(`@/translations/dashboard/${hl}.json`);

  return {
    props: {
      messages: Object.assign({}, messages.default),
      user: session.user,
      hideLayout: true
    }
  };
}

function AdminDashboard({user}) {
  const intl = useIntl();

  return <>
      <Head>
        <title>{
          intl.formatMessage({
            id: 'Summary | Dashboard - LetterCMS'
          })
        }</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel= "icon" href="/favicon.ico" />
      </Head>
      <Welcome role={user.role} permissions={user.permissions} name={user.name} firstTime={user.firstTime}/>
    </>;
};

AdminDashboard.getLayout = function getLayout(page, user) {
  return <DashboardProvider accessToken={user.accessToken} userID={user.id}>{page}</DashboardProvider>;
};

export default AdminDashboard;

