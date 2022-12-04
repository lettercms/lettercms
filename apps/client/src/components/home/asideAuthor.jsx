export default function Author({name, lastname, photo, ocupation, description, facebook, twitter, linkedin, instagram, website}) {
  return<>
    <hr className='w-3/4 my-8'/>
    <div
      className='
      flex
      flex-col
      items-center'
    >
      <img src={photo} className='rounded-full'/>
      <div className='my-4'>
        <span className='font-bold text-lg'>{name} {lastname}</span>
      </div>
      <div>
        <span>{ocupation}</span>
      </div>
      <p>{description}</p>
    </div>
  </>
}