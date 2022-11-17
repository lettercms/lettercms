import Head from '@/components/head';
import Landing from '@/components/index/landing';
import Card from '@/components/index/card';
import dynamic from 'next/dynamic';
import {usePosts} from '@/lib/userContext';
import {useRouter} from 'next/router';

const Pagination = dynamic(() => import('@/components/index/pagination'));
const Recommended = dynamic(() => import('@/components/index/recommended'));

const Posts = ({posts}) => {
  return<div id="main">
    <div id="posts-container">
      <span style={{ marginLeft: '5%', display: 'block' }}>Entradas</span>
      {
        posts.map(({
          _id, description, title, images, url, fullUrl, comments, thumbnail, subdomain
        }) => <Card
            key={_id}
            title={title}
            content={description}
            subdomain={subdomain}
            url={url}
            fullUrl={fullUrl}
            thumbnail={thumbnail}
            comments={comments}
            ID={url}
          />
        )
      }
    </div>
  </div>;
};

const Home = ({posts, blog}) => {

  const router = useRouter();
  const customPosts = usePosts(router.query.page);

  let _posts = customPosts.posts || posts;

  const showOverlay = customPosts.status !== 'no-user' && customPosts.status === 'loading';

  return <div>
    <Head title={blog.title} description={blog.description} />
    <Landing isSubscribe={false} description={blog.description} />
    <h1>{blog.title}</h1>
    {/*
      !isSubscribe
      && <h2>{blogData.description}</h2>
    */}
    {
      showOverlay &&
      <div id='overlay'/> 
    }
    {
      _posts.length > 0
        ? <Posts posts={_posts}/>
        : <div id="entries">
            <span>No Hay Entradas</span>
          </div>
    }
        <style jsx>
          {`
          h1 {
            margin: 50px 0 20px;
          }
          h1, h2 {
            text-align: center;
          }
          h2 {
            width: 90%;
            margin: auto;
          }
          :global(.banner-container) {
            margin 10px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          #main {
            margin-top: 50px;
          }
          #pagination-container {
            position: relative;
            width: 80%;
            margin: 0 auto 100px;
            padding: 5px;
          }
          #entries {
            padding: 100px 0;
            width: 100%;
            text-align: center;
          }
          @media screen and (min-width: 720px) {
            :global(.banner-container) {
              margin: 0;
              margin-top: -25px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              padding: 2%;
            }
            .banner-bottom {
              justify-content: center;
              width: 75%;
            }
            h2 {
              width: 60%;
            }
            #entries {
              display: inline-block;
              padding: 160px 0;
              text-align: center;
            }
            #posts-container {
              display: inline-block;
              width: 75%;
            }
            #pagination-container {
              width: 50%;
              margin: 0 0 0 10%;
              padding: 5px;
            }
          }
        `}
        </style>
      </div>;
};

export default Home;
