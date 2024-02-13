import Post from '@/components/landing/post';
import {getPost} from '@/lib/mongo/posts';
import getLanguage from '@/lib/utils/getLanguage';
import getTranslation from '@/lib/utils/getTranslation';

/*
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
*/

export default async function PostLayout({params}) {
const hl = getLanguage();
  const {url} = params;

  const {notFound, post, user, recommendation} = await getPost(url/*, userID*/);

  if (notFound)
    return new Response('', {
      status: 404
    });

    const translation = getTranslation(import(`./translation.${hl}.json`), 'post')

    //Parse Mongo Object IDs
    const props = JSON.parse(JSON.stringify({
      post,
      recommendation,
      user
    }));

  return <Post post={post} recommendation={recommendation} translation={translation}/>
};

