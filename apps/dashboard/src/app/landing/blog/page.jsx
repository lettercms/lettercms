import getLanguage from '@/lib/utils/getLanguage';
import getTranslation from '@/lib/utils/getTranslation';
import {getBlog} from '@/lib/mongo/blogs';
import Blog from '@/components/landing/blog';


/*
async function getProps({req, query}) {
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

export default async function BlogPage({searchParams}) {
  const {page} = searchParams;
  const hl = getLanguage();

  const [translation, blogData] = await Promise.all([
    getTranslation(import(`./translation.${hl}.json`), 'blog'),
    getBlog(page/*, userID*/)
  ]);

  console.log(blogData);
  
  return <Blog translation={translation} posts={blogData.posts.data} blog={blogData.blog} paging={blogData.paging} mostViewed={blogData.mostViewed}/>
};
