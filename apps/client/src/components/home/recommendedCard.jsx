export default function RecommendedCard({title, thumbnail}) {
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
    <div className='
      flex
      flex-row
      w-full
      h-28
      items-center
      rounded-full
      overflow-hidden
      border
      border-solid
      border-main-100
      md:w-5/6
    '>
      <div className='w-28 h-28 bg-center shrink-0 bg-cover rounded-full' style={{backgroundImage: `url(${thumbnail}&h=120)`}}/>
      <div className='w-3/5 p-2'>
        <h3 className='break-words text-sm align-middle'>{title}</h3>
      </div>
    </div>
  </div>
}