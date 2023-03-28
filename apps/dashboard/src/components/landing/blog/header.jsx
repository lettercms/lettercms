import {FormattedMessage} from 'react-intl';

const Header =({title, description, thumbnail}) =>  {
  return <header className='py-24 max-w-7xl'>
    <div className='flex flex-col md:flex-row md:items-center'>
      <div className='w-80 flex flex-col items-center m-auto mb-12 md:mb-auto md:w-3/4'>
        <img src={`${process.env.ASSETS_BASE}/assets/lettercms-logo.svg`} className='h-12 md:mb-8' alt='LetterCMS logo white'/>
        <h1 className='text-4xl text-main-700 text-center'>
          <FormattedMessage id={'Stay tuned of my blog\'s updates'}/>
        </h1>
      </div>
      <div className='md:w-3/4'>
        <img src={`${process.env.ASSETS_BASE}/illustrations/99.svg`} className='desktop' alt='LetterCMS logo white'/>
      </div>
    </div>
  </header>;
};

export default Header;
