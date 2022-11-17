import Header from './header';
import Recommended from './recommended';
import Entries from './entries';

export default function Home({blog, posts}) {
  return <div>
    <Header title={blog.title} description={blog.description}/>
    <Recommended posts={posts.slice(0, 3)}/>
    <Entries posts={posts}/>
  </div>
}