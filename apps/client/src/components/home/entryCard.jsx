export default function EntryCard({title, thumbnail, description, author, tags, comments}) {
  return <div className='flex flex-col mx-3 my-16 md:w-2/5 lg:w-full lg:flex-row-reverse'>
    <div className='lg:w-2/3'>
      <div className='flex items-center'>
        <div className='shrink-0 basis-32 w-32 h-32 bg-cover bg-center rounded-lg mr-1' style={{backgroundImage: `url(${thumbnail})`}}/>
        <h3 className='px-1 text-lg text-slate-500 font-bold'>{title}</h3>
      </div>
      <p className='py-3 mt-4'>{description}</p>
    </div>
    <div className='lg:flex lg:flex-col-reverse lg:justify-between lg:w-1/3'>
      <div className='flex justify-between items-end my-4 lg:flex-col'>
        <div className='lg:hidden'>
          <span>c: {comments}</span>
        </div>
        <div className='flex flex-row-reverse items-end lg:px-4 lg:items-center'>
          <div className='w-12 h-12 bg-cover bg-center rounded-full shrink-0' style={{backgroundImage: `url(${author.photo})`}}/>
          <h4 className='mx-2 text-sm'>{author.name} {author.lastname}</h4>
        </div>
      </div>
      <ul className='flex flex-wrap'>
        {
          tags.map((e, i) => <li className='bg-main-500 rounded-md m-1 px-2 text-white' key={e + i}>{e}</li>)
        }
      </ul>
    </div>
  </div>;
}