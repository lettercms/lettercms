import Post from '@/components/post';
import {parse as cookieParser} from 'cookie';
import {getSession} from 'next-auth/react';
import {getPost} from '@/lib/mongo/posts';
import jwt from 'jsonwebtoken';

export const getServerSideProps = async ({req, res, query}) => {  
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

  return {
    props: {
      ...props,
      //TODO: implement SDK token generation
      accessToken: jwt.sign({subdomain: 'davidsdevel'}, process.env.JWT_AUTH)
    }
  };
};

export default Post;
