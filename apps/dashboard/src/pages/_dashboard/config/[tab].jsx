import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import Head from 'next/head';
import {getSession} from 'next-auth/react';
import {DashboardProvider} from '@/components/dashboard/layout';
import PageLoad from '@/components/dashboard/logoLoad';
import dynamic from 'next/dynamic';

const Config = dynamic(() => import('@/components/dashboard/admin/config'), {
  loading: PageLoad
});

const tabs = [
  'blog',
  'account',
  'usage',
  'developers'
];

export async function getServerSideProps({ req, res, query }) {
  const {tab, hl} = query;

  if (!tabs.includes(tab))
    return {
      notFound: true
    };
  
  const session = await getSession({req});

  if (!session)
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    };

  const messages = await import(`@/translations/dashboard/config/${hl}.json`);

  return {
    props: {
      messages: Object.assign({}, messages.default),
      user: session.user,
      hideLayout: true,
      tab
    }
  };
}

const AdminDashboard = ({tab, user}) => {
  const intl = useIntl();

  return <>
      <Head>
        <title>{
          intl.formatMessage({
            id: 'Config | Dashboard - LetterCMS'
          })
        }</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Config tab={tab}/>
    </>;
};
AdminDashboard.getLayout = function getLayout(page, user) {
  return <DashboardProvider accessToken={user.accessToken} userID={user.id}>{page}</DashboardProvider>;
};
export default AdminDashboard;

