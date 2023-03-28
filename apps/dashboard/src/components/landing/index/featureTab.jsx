import {FaCircle} from 'react-icons/fa';
import {FormattedMessage, useIntl} from 'react-intl';
import Button from '@/components/button';
import {useRouter} from 'next/router';
import {useState, useEffect, useRef} from 'react';


export default function FeaturesTab({tab, index, title, img, description, feats}) {
  const ref = useRef(null);
  const router = useRouter();
  const intl = useIntl();

  useEffect(() => {
    if (tab === index) {
      ref.current.style.display = 'flex';
      setTimeout(() => {
        ref.current.style.opacity = 1;
      }, 0);
    } else {
        ref.current.style.opacity = 0;
                      
        setTimeout(() => {
          ref.current.style.display = 'none';
        }, 150);
      }
    }, [tab]);

  return <div key={title} ref={ref} className='w-full transition-all duration-150 ease flex-col items-center md:flex-row md:py-16' role="tabpanel" aria-labelledby={`tab-${index}`}>
    <img src={img} alt="alternative"/>
    <div className="my-8 text-center">
      <h4 className='font-bold text-2xl text-main-700'>{
        intl.formatMessage({
          id: title
        })
      }</h4>
      <p className='my-8 px-2'>{
        intl.formatMessage({
          id: description
        })
      }</p>
      <ul className="text-left pl-8 pr-2 mb-12">
      {
        feats.map((feat, i) => <li key={`${title}-f-${i}`} className="flex items-center my-2">
          <FaCircle fill='#837bbf' style={{width: 8}}/>
          <div className='ml-1'>{
            intl.formatMessage({
              id: feat
            })
          }</div>
        </li>)
      }
      </ul>
      <Button type='solid' onClick={() => router.push('/signin')}>
        <FormattedMessage id="REGISTER"/>
      </Button>
    </div>
  </div>;
}