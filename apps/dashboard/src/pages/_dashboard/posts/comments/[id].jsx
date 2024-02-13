import Head from 'next/head';
import {getSession} from 'next-auth/react';
import {DashboardProvider} from '@/components/dashboard/layout';
import dynamic from 'next/dynamic';
import PageLoad from '@/components/dashboard/logoLoad';

const Comments = dynamic(() => import('@/components/dashboard/admin/comments'), {
  loading: PageLoad
});

export async function getServerSideProps({req}) {
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

function AdminDashboard() {
  return <>
      <Head>
        <title>Comentarios | Dashboard - LetterCMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel= "icon" href="/favicon.ico" />
      </Head>
      <Comments/>
    </>;
};
AdminDashboard.getLayout = function getLayout(page, user) {
  return <DashboardProvider accessToken={user.accessToken} userID={user.id}>{page}</DashboardProvider>;
};

export default AdminDashboard;

