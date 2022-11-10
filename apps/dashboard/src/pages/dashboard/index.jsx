import Head from 'next/head';
import {getSession} from 'next-auth/react';
import {DashboardProvider} from '@/components/layout';
import LogoLoad from '@/components/logoLoad';
import dynamic from 'next/dynamic';

const Welcome = dynamic(() => import('@/components/admin/welcome'), {
  ssr: false,
  loading:LogoLoad
});

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
        <title>Resumen | Dashboard - LetterCMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Welcome role={user.role} permissions={user.permissions} name={user.name} firstTime={user.firstTime}/>
    </>;
};
AdminDashboard.getLayout = function getLayout(page, user) {
  return <DashboardProvider accessToken={user.accessToken} userID={user.id}>{page}</DashboardProvider>;
};
export default AdminDashboard;

