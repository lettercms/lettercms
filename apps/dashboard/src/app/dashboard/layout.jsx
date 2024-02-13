//import Head from 'next/head';
import {DashboardProvider} from '@/components/dashboard/layout';
import authOptions from '@/app/nextAuthConfig';
import {getServerSession} from 'next-auth/next';
import {redirect} from 'next/navigation';

export default async function AdminDashboard({children}) {
  const session = await getServerSession(authOptions);

  console.log(session)
  
  if (!session)
    return redirect('/login');

  const {user: {accessToken, id}} = session;

  return <DashboardProvider accessToken={accessToken} userID={id}>{children}</DashboardProvider>;
};
