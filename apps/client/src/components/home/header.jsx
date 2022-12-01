export default function header({title, description, thumbnail}) {
  return <div className='bg-center bg-cover' style={{backgroundImage: `url(${thumbnail})` }}>
    <div className='
      bg-gradient-to-t
      from-white
      via-[#fffe]
      to-[#fff5]
      w-full
      h-full
      flex
      flex-col
      py-44
      md:py-56'
    >
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-center text-main-500 w-4/5 md:w-2/3 text-5xl'>{title}</h1>
        <h2 className='text-center text-main-700 w-4/5 md:w-2/3 text-lg'>{description}</h2>
    </div>
    </div>
  </div>;
}
