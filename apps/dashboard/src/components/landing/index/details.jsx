import {FormattedMessage} from 'react-intl';
import Button from '@/components/button';
import {useRouter} from 'next/router';
import {FaSquare} from 'react-icons/fa';
import Container from '@/components/container';

export default function Details() {
  const router = useRouter();

  return <div id="details" className="bg-slate-50 py-12">
    <Container className='bg-white m-auto flex flex-col items-center'>
      <div className="text-center max-w-2xl">
        <img className="max-w-md m-auto w-full" src={`${process.env.ASSETS_BASE}/illustrations/489.svg`} alt="alternative"/>
        <h3 className='mt-8 font-bold text-2xl text-main-700'>
          <FormattedMessage id={'It\'s time to improve your content creation'}/>
        </h3>
        <p className='my-12'>
          <FormattedMessage id={'Our goal is for you to grow and deliver your content in the best possible way. With LetterCMS you won\'t have to add plugins or use external tools, we offer everything in one place.'}/>
        </p>
        <ul>
          <li className="flex text-left">
            <FaSquare fill='#837bbf' style={{marginTop: 4, marginRight: 4, width: 8}}/>
            <div>
              <FormattedMessage id='Attract new readers and offer them quality'/>
            </div>
          </li>
          <li className="flex text-left">
            <FaSquare fill='#837bbf' style={{marginTop: 4, marginRight: 4, width: 8}}/>
            <div>
              <FormattedMessage id='Create and collab more efficiently'/>
            </div>
          </li>
        </ul>
        <Button type='solid' className='mt-12' onClick={() => router.push('/signin')}>
          <FormattedMessage id="REGISTER"/>
        </Button>
      </div>
    </Container>
  </div>;
}