import Card from './entryCard';

export default function Entries({posts}) {
  return <div className='container flex justify-center'>
    <div className='md:flex md:flex-wrap md:justify-around lg:w-2/3 max-w-2xl'>
      {posts.map(e => <Card key={e._id} {...e}/>)}
    </div>
  </div>
}
