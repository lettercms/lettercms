import {Layout} from '@/components/landing/layout';
import Header from '@/components/landing/blog/header';
import {getSession} from 'next-auth/react';
import {parse as cookieParser} from 'cookie';
import {getBlog} from '@/lib/mongo/blogs';
import {captureException} from '@sentry/nextjs';
import Head from '@/components/landing/headBlog';
import Aside from '@/components/landing/blog/aside';
import Card from '@/components/landing/blog/card';
import Paging from '@/components/landing/blog/paging';

function Blog({posts, blog, paging, mostViewed}) {

  return <div>
    <Head ogImage={'blog.thumbnail'}/>
    <Header/>
    <div className='flex flex-col mx-2 max-w-8xl m-auto md:flex-row'>
      <div className='md:w-2/3'>
        {posts.map(e => <Card
            key={`blog-index-${e._id}`}
            title={e.title}
            content={e.description}
            url={e.url}
            thumbnail={e.thumbnail}
            comments={e.comments}
            ID={e._id}
          />
        )}
        <Paging {...paging}/>
      </div>
      <Aside mostViewed={mostViewed} owner={blog.owner}/>
    </div>
  </div>;
};

export async function getServerSideProps({req, res, query}) {
  try {
    const {page, hl = 'en'} = query;
    const referrer = req?.headers.referrer || null;
    const {userID = null} = req ? req.cookies : cookieParser(document.cookie);
    const session = await getSession({req});
    
    const blogData = await getBlog(page, userID);

    const lang = await import(`@/translations/blog/${hl}.json`);

    const messages = Object.assign({}, lang.default);

    const {blog, posts, mostViewed} = JSON.parse(JSON.stringify(blogData));

    return {
      props: {
        messages,
        posts: posts.data,
        blog,
        paging: posts.paging,
        userID,
        referrer,
        mostViewed,
        session
      }
    };
  } catch(err) {
    captureException(err);

    throw err;
  }
}

export default function BlogLayout({session, accessToken, referrer, ...e}) {
  return <Layout session={session} accessToken={accessToken} referrer={referrer}>
    <Blog {...e}/>
  </Layout>;
};