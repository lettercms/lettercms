import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import Head from 'next/head';
import sdk from '@lettercms/sdk';
import {getSession} from 'next-auth/react';
import {DashboardProvider} from '@/components/dashboard/layout';
import {getAccounts} from '@/lib/mongo/social';
import PageLoad from '@/components/dashboard/logoLoad';
import dynamic from 'next/dynamic';

const Social = dynamic(() => import('@/components/dashboard/admin/social'), {
  loading: PageLoad
});

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

  if (!accounts.facebook && !accounts.instagram)
    return {
      notFound: true
    };

  const messages = await import(`@/translations/dashboard/social/publish/${hl}.json`);

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
  const intl = useIntl();

  return <>
      <Head>
        <title>{
          intl.formatMessage({
            id: 'Publish | Dashboard - LetterCMS'
          })
        }</title>
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

