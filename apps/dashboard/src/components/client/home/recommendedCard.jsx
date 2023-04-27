import Link from 'next/link';

export default function RecommendedCard({title, thumbnail, author, url}) {
  return <div className='
    flex
    justify-center
    w-full
    my-3
    mx-3
    md:mx-0
    md:w-1/2
    lg:w-1/3
  '>
    <Link href={`/${url}`} className='w-full md:w-5/6'>
        <div className='
          flex
          flex-row
          w-full
          items-center
          justify-center
          items-center
          rounded-lg
          pointer

          bg-cover
          bg-center
          px-12
          py-8'
          style={{backgroundImage: `url(${thumbnail}&h=400&q=50)`}}
        >
          <div className='h-48 w-full bg-slate-50 flex flex-col items-center justify-center'>
            <h3 className='break-words text-lg font-bold text-center text-main-700'>{title}</h3>
            <hr className='w-2/3 my-2 border-main-100' />
            <div className='flex items-center mt-4'>
              <img src={author.photo + '?w=35&h=35&q=25'} className='w-8 h-8 rounded-full mr-2'/>
              <h4 className='text-sm'>{author.name} {author.lastname}</h4>
            </div>
          </div>
        </div>
    </Link>
  </div>;
}