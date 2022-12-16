import Card from './recommendedCard';

export default function Recommended({posts}) {
  return <div className='flex flex-row align-center flex-wrap justify-around'>
    {
      posts.map(e => <Card key={e._id} {...e}/>)
    }
  </div>;
}