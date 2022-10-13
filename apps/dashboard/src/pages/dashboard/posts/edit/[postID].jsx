import {useEffect, useState} from 'react';
import Head from 'next/head';
import sdk from '@lettercms/sdk';
import {getSession} from 'next-auth/react';
import {DashboardProvider} from '@/lib/dashboardContext';
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


  return {
    props: {
      user: session.user,
      postID: query.postID,
      hideLayout: true
    }
  };
}

const PostEditor = ({postID, user}) => {
  return <>
      <Head>
        <title>Editar Entrada | Dashboard - LetterCMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Editor postID={postID} accessToken={user.accessToken}/>
    </>;
};
PostEditor.getLayout = function getLayout(page, user) {
  return <DashboardProvider hideMenu={true} accessToken={user.accessToken} userID={user.id}>{page}</DashboardProvider>;
};

export default PostEditor;

