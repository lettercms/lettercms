//import {Layout} from '@/components/landing/layout';
//import {getSession} from 'next-auth/react';
//import {parse as cookieParser} from 'cookie';
//import {getBlog} from '@/lib/mongo/blogs';
//import {captureException} from '@sentry/nextjs';
//import Head from '@/components/landing/headBlog';

import Header from '@/components/landing/blog/header';
import Aside from '@/components/landing/blog/aside';
import Card from '@/components/landing/blog/card';
import Paging from '@/components/landing/blog/paging';

export default function Blog({posts, blog, paging, mostViewed, translation}) {
  blog.owner._id = blog.owner._id.toString();

  return <div className='flex flex-col w-full'>
    {/*<Head ogImage={blog.thumbnail}/>*/}
    <Header translation={translation}/>
    <div className='flex flex-col w-full md:flex-row'>
      <div className='w-full md:w-2/3'>
        {
          posts.map(e => {
            const idString = e._id.toString();

            return <Card
              translation={translation}
              key={`blog-index-${idString}`}
              title={e.title}
              content={e.description}
              url={e.url}
              thumbnail={e.thumbnail}
              comments={e.comments}
              ID={idString}
            />
          })
        }
        <Paging {...paging} translation={translation}/>
      </div>
      {/*<Aside mostViewed={mostViewed} owner={blog.owner} translation={translation}/>*/}
      <Aside mostViewed={mostViewed} owner={blog.owner} translation={translation}/>
    </div>
  </div>;
};

/*
export async function getServerSideProps({req, query}) {
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
*/