import Header from './header';
import Recommended from './recommended';
import Aside from './aside';
import Entries from './entries';

export default function Home({blog, posts}) {
  return <div>
    <Header title={blog.title} description={blog.description} thumbnail={blog.thumbnail}/>
    <Recommended posts={posts.slice(0, 3)}/>
    <div className='flex flex-col md:flex-row mt-24 px-8 pb-12'>
      <Entries posts={posts}/>
      <Aside entries={posts} tags={blog.tags} categories={blog.categories}/>
    </div>
  </div>;
}