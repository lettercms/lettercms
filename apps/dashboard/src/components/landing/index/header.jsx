import {FormattedMessage} from 'react-intl';
import {useRouter} from 'next/router';
import Button from '@/components/button';

export default function  Header (){
  const router = useRouter();

  return <div>
    <header id="header" className="text-center bg-white md:py-16">
      <div className="flex flex-col items-center md:flex-row">
        <div className='md:w-3/4'>
          <h1 className='flex flex-col text-main-500 mt-24 text-6xl font-bold font-rubik'>
            <span>Crea</span>
            <span>Atrae</span>
            <span>Deleita</span>
          </h1>
          <h2 className='px-4 mt-8 mb-16'>
            <FormattedMessage id='Use LetterCMS to attract new users and offer them the best content based on their tastes'/>
          </h2>
          <Button type='solid' className='w-max' onClick={() => router.push('/signin')}>
            {/*<FormattedMessage id="REGISTER"/>*/}
            Crear mi Blog
          </Button>
        </div>
        <div className="w-full mt-8 className='md:w-1/4'">
          <img src={`${process.env.ASSETS_BASE}/illustrations/99.svg`} alt="alternative"/>
        </div> 
      </div> 
    </header>
    <svg className="-mt-1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 310">
      <path fill='#fff' d="M0,283.054c22.75,12.98,53.1,15.2,70.635,14.808,92.115-2.077,238.3-79.9,354.895-79.938,59.97-.019,106.17,18.059,141.58,34,47.778,21.511,47.778,21.511,90,38.938,28.418,11.731,85.344,26.169,152.992,17.971,68.127-8.255,115.933-34.963,166.492-67.393,37.467-24.032,148.6-112.008,171.753-127.963,27.951-19.26,87.771-81.155,180.71-89.341,72.016-6.343,105.479,12.388,157.434,35.467,69.73,30.976,168.93,92.28,256.514,89.405,100.992-3.315,140.276-41.7,177-64.9V0.24H0V283.054Z"/>
    </svg>
  </div>;
}
