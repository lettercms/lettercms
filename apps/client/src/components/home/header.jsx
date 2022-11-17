export default function header({title, description}) {
  return <div className='flex  flex-col py-44 md:py-0  md:flex-row columns-1 md:columns-2'>
    <div className='basis-full md:basis-2/5 flex flex-col items-center justify-center'>
      <h1 className='text-main-500 w-4/5 md:w-2/3 text-4xl'>{title}</h1>
      <h2 className='text-main-700 w-4/5 md:w-2/3'>{description}</h2>
    </div>
    <div className='hidden md:block md:basis-3/5'>
      <img src={`${process.env.ASSETS_BASE}/illustrations/72.svg`}/>
    </div>
  </div>
}
