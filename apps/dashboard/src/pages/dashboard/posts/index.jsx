import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import Head from 'next/head';
import sdk from '@lettercms/sdk';
import {getSession} from 'next-auth/react';
import {DashboardProvider} from '@/components/layout';
import dynamic from 'next/dynamic';
import PageLoad from '@/components/logoLoad';

const Posts = dynamic(() => import('@/components/admin/posts'), {
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

  const messages = await import(`@/translations/dashboard/posts/${hl}.json`);

  return {
    props: {
      messages: Object.assign({}, messages.default),
      user: session.user,
      hideLayout: true
    }
  };
}

const AdminDashboard = ({tab, user}) => {
  const intl = useIntl();

  return <>
      <Head>
        <title>{
          intl.formatMessage({
            id: 'Posts | Dashboard - LetterCMS'
          })
        }</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Posts/>
    </>;
};
AdminDashboard.getLayout = function getLayout(page, user) {
  return <DashboardProvider accessToken={user.accessToken} userID={user.id}>{page}</DashboardProvider>;
};

export default AdminDashboard;

