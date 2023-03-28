import Spinner from '@lettercms/icons/spinner';
import Image from 'next/image';

const Load = () => <div id="load-container" className='absolute w-full h-full flex justify-center items-center flex-col top-0 right-0'>
  <img alt="David's Devel Logo" className='h-24' src={`${process.env.ASSETS_BASE}/assets/lettercms-logo.svg`}/>
  <div className='animate-spin w-20 h-20 mt-4'>
    <Spinner fill='#3c4146'/>
  </div>
  <style jsx global>{`
    body {
      height: 100vh;
    }
    #__next {
      height: 100%;
    }
  `}</style>
</div>;

export default Load;
