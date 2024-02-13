import {Layout} from '@/components/landing/layout';
import Post from '@/components/landing/post';
import {getSession} from 'next-auth/react';
import {getPost} from '@/lib/mongo/posts';
import jwt from 'jsonwebtoken';
import {captureException} from '@sentry/nextjs';

export const getServerSideProps = async ({req, query}) => {
  try {
    const {url, hl = 'en'} = query;
    const userID = req?.cookies.userID || 'no-user';
    const session = await getSession({req});

    const {notFound, post, user, recommendation} = await getPost(url, userID);

    if (notFound)
      return {
        notFound: true
      };

    const lang = await import(`@/translations/post/${hl}.json`);

    const messages = Object.assign({}, lang.default);

    //Parse Mongo Object IDs
    const props = JSON.parse(JSON.stringify({
      post,
      referrer: req?.headers.referer || null,
      recommendation,
      user
    }));

    return {
      props: {
        ...props,
        messages,
        session,
        //TODO: implement SDK token generation
        accessToken: jwt.sign({subdomain: 'davidsdevel'}, process.env.JWT_AUTH)
      }
    };
  } catch(err) {
    captureException(err);

    throw err;
  }
};

export default function PostLayout({session, accessToken, referrer, ...e}) {
  return <Layout session={session} accessToken={accessToken} referrer={referrer}>
    <Post {...e}/>
  </Layout>;
};

