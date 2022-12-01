export default function AsideCard({title, thumbnail, url}) {
  return <div className='flex flex-row items-center my-4 w-4/5'>
    <div className='w-28 h-28 bg-center bg-cover shrink rounded-lg mr-2' style={{backgroundImage: `url(${thumbnail})`}}/>
    <div>
      <h4>{title}</h4>
      <div></div>
    </div>
  </div>
}