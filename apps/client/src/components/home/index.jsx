import { NextSeo } from 'next-seo';
import Header from './header';
import Recommended from './recommended';
import Aside from './aside';
import Entries from './entries';

export default function Home({blog, posts, popular}) {
  const url = `https://${blog.customDomain || `${blog.subdomain}.lettercms.vercel.app`}`;

  return <div>
    <NextSeo
      title={blog.title}
      description={blog.description}
      canonical={url}
      openGraph={{
        type: 'article',
        title: blog.title,
        url,
        description: blog.description,
        images: [
          { url: blog.thumbnail },
        ],
        site_name: blog.title
      }}
      facebook={{
        appId: process.env.FACEBOOK_APP_ID
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
        {
          rel: 'manifest',
          href: '/manifest.json'
        }
      ]}
    />
    <Header title={blog.title} description={blog.description} thumbnail={blog.thumbnail}/>
    <Recommended posts={posts.slice(0, 3)}/>
    <div className='flex flex-col md:flex-row mt-24 px-8 pb-12'>
      <Entries posts={posts}/>
      <Aside entries={popular} tags={blog.tags} categories={blog.categories}/>
    </div>
  </div>;
}