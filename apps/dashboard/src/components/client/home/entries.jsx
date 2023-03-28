import Card from './entryCard';
import Pagination from './pagination';

export default function Entries({posts, actual, pages}) {
  return <div className='w-full container flex justify-center lg:w-2/3'>
    <div className='md:flex md:flex-wrap md:justify-around max-w-2xl'>
      <div className='w-full'>
        <span className='font-bold text-sm'>Entradas</span>
      </div>
      {posts.map(e => <Card key={e._id} {...e}/>)}
      <Pagination actual={actual} pages={pages}/>
    </div>
  </div>;
}
