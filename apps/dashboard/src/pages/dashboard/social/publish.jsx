import {useEffect, useState} from 'react';
import Head from 'next/head';
import sdk from '@lettercms/sdk';
import {getSession} from 'next-auth/react';
import {DashboardProvider} from '@/components/layout';
import Social from '@/components/admin/social';
import {getAccounts} from '@/lib/mongo/social';

export async function getServerSideProps({ req, res, query}) {
  const {hl} = query;
  const session = await getSession({req});

  if (!session)
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    };

  const accounts = await getAccounts();
  const messages = await import(`@/translations/dashboard/social/${hl}.json`);

  return {
    props: {
      messages: Object.assign({}, messages.default),
      user: session.user,
      hideLayout: true,
      accounts
    }
  };
}

const AdminDashboard = ({accounts}) => {
  return <>
      <Head>
        <title>Publicación | Dashboard - LetterCMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Social publish accounts={accounts}/>
    </>;
};

AdminDashboard.getLayout = function getLayout(page, user) {
  return <DashboardProvider accessToken={user.accessToken} userID={user.id}>{page}</DashboardProvider>;
};

export default AdminDashboard;

