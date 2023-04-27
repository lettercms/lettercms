import {useIntl} from 'react-intl';
import Head from 'next/head';
import {getSession} from 'next-auth/react';
import {DashboardProvider} from '@/components/dashboard/layout';
import PageLoad from '@/components/dashboard/logoLoad';
import dynamic from 'next/dynamic';

const Stats = dynamic(() => import('@/components/dashboard/admin/stats'), {
  loading: PageLoad
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

  const messages = await import(`@/translations/dashboard/stats/${hl}.json`);

  return {
    props: {
      messages: Object.assign({}, messages.default),
      user: session.user,
      hideLayout: true
    }
  };
}

function AdminDashboard() {
  const intl = useIntl();

  return <>
    <Head>
      <title>
        {
          intl.formatMessage({
            id: 'Stats | Dashboard - LetterCMS'
          })
        }
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Stats/>
  </>;
};

AdminDashboard.getLayout = function getLayout(page, user) {
  return <DashboardProvider accessToken={user.accessToken} userID={user.id}>{page}</DashboardProvider>;
};

export default AdminDashboard;

