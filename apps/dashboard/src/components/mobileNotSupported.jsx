import {FormattedMessage} from 'react-intl';
import Image from 'next/image';
import Button from '@/components/button';
import Router from 'next/router';

const NotSupported = () => <div id='not-supported-container'>

  <div className='image-container'>
    <Image layout='fill' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/warn.png' alt='Warning'/>
  </div>
  <div id='text-container'>
    <span>
      <FormattedMessage id={'We\'re sorry, our app doesn\'t work on mobile devices. Login from a PC to enjoy all the tools we have for you'}/>
    </span>
  </div>
  <Button type='solid' onClick={() => Router.push('/')}>
    <FormattedMessage id='HOME'/>
  </Button>
  <style jsx>{`
    #not-supported-container {
      background:#5f4dee;
      height: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .image-container {
      width: 180px;
      height: 180px;
      margin: 0 auto 75px;
      position: relative;
    }
    #text-container {
      padding: 0 5%;
      font-size: 1.5rem;
      text-align: center;
      width: 90%;
      padding: 25px 5%;
      border-radius: 5px;
      background: white;
      margin-bottom: 1rem;
    }

  `}</style>
</div>;

export default NotSupported;
