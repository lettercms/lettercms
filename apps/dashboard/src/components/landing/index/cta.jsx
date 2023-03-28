import {FormattedMessage} from 'react-intl';
import Link from 'next/link';
import Button from '@/components/button';
import {useRouter} from 'next/router';

export default function CTA() {
  const router = useRouter();

  return <div className="bg-white pt-12">
    <div className='w-4/5 m-auto flex flex-col items-center'>
      <div className="my-12 max-w-xl">
        <img className="img-fluid" src={`${process.env.ASSETS_BASE}/illustrations/324.svg`} alt="alternative"/>
      </div>
      <p className="p-heading">
        <FormattedMessage id='Start from scratch and growth with us.'/>
      </p>
      <Button type='solid' className='my-12' onClick={() => router.push('/signin')}>
        <FormattedMessage id="REGISTER"/>
      </Button>
    </div>
    <svg className="bg-white"  data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 79">
      <path fill="#5f4def" d="M0,72.427C143,12.138,255.5,4.577,328.644,7.943c147.721,6.8,183.881,60.242,320.83,53.737,143-6.793,167.826-68.128,293-60.9,109.095,6.3,115.68,54.364,225.251,57.319,113.58,3.064,138.8-47.711,251.189-41.8,104.012,5.474,109.713,50.4,197.369,46.572,89.549-3.91,124.375-52.563,227.622-50.155A338.646,338.646,0,0,1,1920,23.467V79.75H0V72.427Z" transform="translate(0 -0.188)"/>
    </svg>
  </div>;
}
