import Post from '@/components/post';
import {getSession} from 'next-auth/react';
import {getPost} from '@/lib/mongo/posts';
import jwt from 'jsonwebtoken';
import {captureException} from '@sentry/nextjs';

export const getServerSideProps = async ({req, res, query}) => {
  try {
    const {url} = query;
    const userID = req?.cookies.userID || 'no-user';

    const {notFound, post, user, recommendation} = await getPost(url, userID);

    if (notFound)
      return {
        notFound: true
      };

    //Parse Mongo Object IDs
    const props = JSON.parse(JSON.stringify({
      post,
      referrer: req?.headers.referer || null,
      recommendation,
      user
    }));

    console.log(recommendation);

    return {
      props: {
        ...props,
        //TODO: implement SDK token generation
        accessToken: jwt.sign({subdomain: 'davidsdevel'}, process.env.JWT_AUTH)
      }
    };
  } catch(err) {
    captureException(err);

    throw err;
  }
};

export default Post;
