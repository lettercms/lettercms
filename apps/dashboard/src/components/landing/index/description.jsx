import Container from '@/components/container';

export default function MainFeature({translation}) {
  return <div className="flex flex-col text-center mt-12">
    <div className='text-white'>
      <div className="text-4xl font-bold">
        {translation['CREATE']}
      </div>
        <h3 className='mt-2 mb-8'>
          {translation['Create the best content for your users with tools made for you']}
        </h3>
    </div> 
    <div className="flex flex-col my-8 items-center md:flex-row">
      <Container className='bg-white md:mx-4'>
        <div className='justify-center flex'>
          <img className="img-fluid" src={`${process.env.ASSETS_BASE}/illustrations/5.svg`} alt="alternative"/>
        </div>
        <div className="card-body">
          <h4 className="my-8 font-bold text-2xl text-gray-400">
            {translation['WYSIWYG Editors']}
          </h4>
          <p className='mb-8 px-2'>
            {translation['Create your entries and pages faster with our editors which makes easier this task for you. Drag, drop and create']}
          </p>
        </div>
      </Container>
      <Container className='bg-white md:mx-4'>
        <div className='justify-center flex'>
          <img className="img-fluid" src={`${process.env.ASSETS_BASE}/illustrations/109.svg`} alt="alternative"/>
        </div>
        <div className="card-body">
          <h4 className="my-8 font-bold text-2xl text-gray-400">
            {translation['Split tests']}
          </h4>
          <p className='mb-8 px-2'>
            {translation['Test and offer the best version of your content in a simple way and without external tools']}
          </p>
        </div>
      </Container>
      <Container className='bg-white md:mx-4'>
        <div className='justify-center flex'>
          <img className="img-fluid" src={`${process.env.ASSETS_BASE}/illustrations/125.svg`} alt="alternative"/>
        </div>
        <div className="card-body">
          <h4 className="my-8 font-bold text-2xl text-gray-400">
            {translation['Collaborators']}
          </h4>
          <p className='mb-8 px-2'>
            {translation['Keep your team united and optimize your content creation. Avoid delayments when delivering your content']}
          </p>
        </div>
      </Container>
    </div>
    <svg className="bg-white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 310">
      <path fill="#5f4dee" d="M0,283.054c22.75,12.98,53.1,15.2,70.635,14.808,92.115-2.077,238.3-79.9,354.895-79.938,59.97-.019,106.17,18.059,141.58,34,47.778,21.511,47.778,21.511,90,38.938,28.418,11.731,85.344,26.169,152.992,17.971,68.127-8.255,115.933-34.963,166.492-67.393,37.467-24.032,148.6-112.008,171.753-127.963,27.951-19.26,87.771-81.155,180.71-89.341,72.016-6.343,105.479,12.388,157.434,35.467,69.73,30.976,168.93,92.28,256.514,89.405,100.992-3.315,140.276-41.7,177-64.9V0.24H0V283.054Z"/>
    </svg>
  </div>;
}
