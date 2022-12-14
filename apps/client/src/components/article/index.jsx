import { NextSeo } from 'next-seo';
import Header from '@/components/home/header';
import Recommended from '@/components/home/recommended';
import Aside from '@/components/home/aside';
import Content from './content';
import Card from './recommendCard';

export default function Article({blog, popular, post, recommended}) {
  const ogTitle =  `${post.title} | ${blog.title}`;

  return <div>
    <NextSeo
      title={ogTitle}
      description={post.description}
      canonical={''}
      openGraph={{
        type: 'article',
        url: `/${post.url}`,
        title: ogTitle,
        description: post.description,
        images: [
          { url: post.thumbnail },
        ],
        site_name: blog.title,
        profile: {
          firstName: post.author.name,
          lastName: post.author.lastname,
        },
        article: {
          publishedTime: post.published,
          modifiedTime: post.updated,
          authors:[
            post.author.website ||
            post.author.facebook ||
            post.author.twitter ||
            post.author.linkedin ||
            post.author.instagram ||
            `${post.author.name} ${post.author.lastname}`
          ],
          ...(post.tags ? {tags: post.tags} : {}),
          ...(post.category ? {section: post.category} : {})
        }
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
    <Header title={post.title} description={post.description} thumbnail={post.thumbnail} breadcrumbs/>
    {/*<Recommended post={recommended.slice(0, 3)}/>*/}
    <div className='flex flex-col md:flex-row mt-24 px-2 lg:px-8 pb-12 flex-wrap'>
      <Content html={post.content} published={post.published} tags={post.tags}/>
      <Aside entries={popular} tags={blog.tags} author={post.author} categories={blog.categories}/>
      <div className='flex flex-wrap'>
        <div className='w-full px-4 mt-8 lg:mt-0'>
          <span className='text-lg font-bold text-main-700'>Te podría interesar</span>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row justify-around w-full'>
        {
          recommended.map(e => <Card key={e._id} {...e}/>)
        }
      </div>
    </div>
  </div>;
}
