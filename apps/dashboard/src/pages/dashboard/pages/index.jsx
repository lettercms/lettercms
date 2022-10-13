import {useEffect, useState} from 'react';
import Head from 'next/head';
import sdk from '@lettercms/sdk';
import {getSession} from 'next-auth/react';
import {DashboardProvider} from '@/lib/dashboardContext';
import Pages from '@/components/admin/pages';

export async function getServerSideProps({ req, res, query}) {
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
      hideLayout: true
    }
  };
}

const AdminDashboard = ({tab, user}) => {
  return <>
      <Head>
        <title>Paginas | Dashboard - LetterCMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Pages/>
    </>;
};
AdminDashboard.getLayout = function getLayout(page, user) {
  return <DashboardProvider accessToken={user.accessToken} userID={user.id}>{page}</DashboardProvider>;
};

export default AdminDashboard;

