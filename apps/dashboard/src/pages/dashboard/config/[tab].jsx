import {useEffect, useState} from 'react';
import Head from 'next/head';
import {getSession} from 'next-auth/react';
import {DashboardProvider} from '@/lib/dashboardContext';
import Config from '@/components/admin/config';

const tabs = [
  'blog',
  'account',
  'usage'
];

export async function getServerSideProps({ req, res, query }) {
  const {tab} = query;

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

  return {
    props: {
      user: session.user,
      hideLayout: true,
      tab
    }
  };
}

const AdminDashboard = ({tab, user}) => {
  return <>
      <Head>
        <title>Configuración | Dashboard - LetterCMS</title>
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

