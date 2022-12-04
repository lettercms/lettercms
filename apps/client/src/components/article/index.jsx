import Header from '@/components/home/header';
import Recommended from '@/components/home/recommended';
import Aside from '@/components/home/aside';
import Content from './content';

export default function Article({blog, popular, post}) {
  return <div>
    <Header title={post.title} description={post.description} thumbnail={post.thumbnail}/>
    {/*<Recommended post={recommended.slice(0, 3)}/>*/}
    <div className='flex flex-col md:flex-row mt-24 px-8 pb-12'>
      <Content html={post.content}/>
      <Aside entries={popular} tags={blog.tags} author={post.author} categories={blog.categories}/>
    </div>
  </div>;
}
