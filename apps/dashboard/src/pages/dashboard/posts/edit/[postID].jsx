import {useEffect, useState} from 'react';
import Head from 'next/head';
import sdk from '@lettercms/sdk';
import {getSession} from 'next-auth/react';
import {DashboardProvider} from '@/lib/dashboardContext';
import {getPostData} from '@/lib/mongo/postEdit';
import Editor from '@/components/admin/posts/editor';

export async function getServerSideProps({ req, res, query}) {
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
    }

  return {
    props: {
      user: session.user,
      data
    }
  };
}

const PostEditor = ({data, user}) => {
  return <>
      <Head>
        <title>Editar Entrada | Dashboard - LetterCMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Editor postData={data} accessToken={user.accessToken}/>
    </>;
};

PostEditor.getLayout = function getLayout(page, user) {
  return <DashboardProvider hideMenu={true} accessToken={user.accessToken} userID={user.id}>{page}</DashboardProvider>;
};

export default PostEditor;

