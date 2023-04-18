import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import Head from 'next/head';
import sdk from '@lettercms/sdk';
import {getSession} from 'next-auth/react';
import {DashboardProvider} from '@/components/dashboard/layout';
import {getPostData} from '@/lib/mongo/postEdit';
import PageLoad from '@/components/dashboard/logoLoad';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/dashboard/admin/posts/editor'), {
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

  const data = await getPostData(query.postID, session.user.subdomain);

  if (data.notFound) 
    return {
      notFound: true
    };

  const messages = await import(`@/translations/dashboard/posts/edit/${hl}.json`);

  return {
    props: {
      messages: Object.assign({}, messages.default),
      user: session.user,
      data
    }
  };
}

const PostEditor = ({data, user}) => {
  const intl = useIntl();

  return <>
      <Head>
        <title>
          {
            intl.formatMessage({
              id: 'Edit Post | Dashboard - LetterCMS'
            })
          }
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel= "icon" href="/favicon.ico" />
      </Head>
      <Editor {...data} accessToken={user.accessToken}/>
    </>;
};

PostEditor.getLayout = function getLayout(page, user) {
  return <DashboardProvider accessToken={user.accessToken} userID={user.id}>{page}</DashboardProvider>;
};

export default PostEditor;

