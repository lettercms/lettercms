import connect from '@lettercms/utils/lib/connection';
import posts from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import {Ratings} from '@lettercms/models/users';
import {find as findPosts} from '@lettercms/utils/lib/findHelpers/posts';
import {find as findRecommendations} from '@lettercms/utils/lib/findHelpers/recommendations';
import Card from '@/components/blog/card';
import Header from '@/components/blog/header';
import Aside from '@/components/blog/aside';
import Head from '@/components/headBlog';
import Footer from '@/components/index/footer';
import Layout from '@/components/tracingLayout';
import {parse as cookieParser} from 'cookie';

const Blog = ({posts, blog}) => {
  return <Layout>
    <Head ogImage={blog.thumbnail}/>
    <div>
      <Header/>
      <div id='content-wrapper'>
        <div id='posts-container'>
          {posts.map(e => <Card
              key={`blog-index-${e.title}`}
              title={e.title}
              content={e.description}
              url={e.url}
              fullUrl={e.fullUrl}
              thumbnail={e.thumbnail}
              comments={e.comments}
              ID={e._id}
            />
          )}
        </div>
        <Aside owner={blog.owner}/>
      </div>
      <Footer/>
    </div>
    <style jsx>{`
      #content-wrapper {
        display: flex;
      }
      #posts-container {
        width: 70%;
      }
    `}</style>
  </Layout>;
};

export async function getServerSideProps({req, res, query}) {
  const {page} = query;
  const referrer = req?.headers.referrer || null;
  const {userID} = req ? req.cookies : cookieParser(document.cookie);
  
  await connect();

  const blog = await blogs.findOne({subdomain: 'davidsdevel'}, 'thumbnail owner', {
    populate: {
      path: 'owner',
      select: 'photo name description lastname facebook twitter instagram linkedin website'
    }
  });

  const postsOptions = {
    fields: 'title,description,url,fullUrl,thumbnail,comments',
    page: page || '1'
  }

  let postsData = null;

  if (!userID || userID === 'undefined')
    postsData = await findPosts(posts, {
      subdomain: 'davidsdevel',
      postStatud: 'published'
    }, postsOptions)
  else
    postsData = await findRecommendations(Ratings, {subdomain: 'davidsdevel', userID}, postsOptions);

  return {
    props: {
      blog,
      posts: postsData.data,
      userID,
      referrer
    }
  };
}

export default Blog;
