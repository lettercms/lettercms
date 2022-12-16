import Card from '@/components/blog/card';
import Header from '@/components/blog/header';
import Aside from '@/components/blog/aside';
import Head from '@/components/headBlog';
import Footer from '@/components/index/footer';
import Layout from '@/components/tracingLayout';
import {parse as cookieParser} from 'cookie';
import {getBlog} from '@/lib/mongo/blogs';
import Paging from '@/components/blog/paging';

const Blog = ({posts, blog, paging, mostViewed}) => {
  return <Layout>
    <Head ogImage={blog.thumbnail}/>
    <div>
      <Header/>
      <div id='content-wrapper'>
        <div id='posts-container'>
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
      <Footer/>
    </div>
    <style jsx>{`
      :global(.chart-container)  {
        border: none !important;
      }
      #content-wrapper {
        display: flex;
      }
      #posts-container {
        width: 100%;
      }
      @media screen and (min-width: 720px) {
        #posts-container {
          width: 70%;
        }
      }
    `}</style>
  </Layout>;
};

export async function getServerSideProps({req, res, query}) {
  const {page} = query;
  const referrer = req?.headers.referrer || null;
  const {userID = null} = req ? req.cookies : cookieParser(document.cookie);
  
  const blogData = await getBlog(page);

  const {blog, posts, mostViewed} = JSON.parse(JSON.stringify(blogData));


  return {
    props: {
      posts: posts.data,
      blog,
      paging: posts.paging,
      userID,
      referrer,
      mostViewed
    }
  };
}

export default Blog;
