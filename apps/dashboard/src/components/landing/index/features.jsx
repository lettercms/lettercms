import {FormattedMessage} from 'react-intl';
import {useState} from 'react';
import FeatureTab from './featureTab';

const features = [
  {
    title: 'Integrate your social media',
    description: 'Promote your entries on different channels without waiting. Focus on create, we promote for you',
    img: `${process.env.ASSETS_BASE}/illustrations/5.svg`,
    feats: [
      'Promote on your social media',
      'Send emails to your subscribers',
      'Send notifications to your readers devices'
    ]
  },
  {
    title: 'Show the right content',
    img: `${process.env.ASSETS_BASE}/illustrations/109.svg`,
    description: 'Our recommendation systems will help you to offer the right content for each person',
    feats: [
      'Similarity filter',
      'Recommendations based on tastes',
      '100% Dinamic content'
    ]
  },
  {

    title: 'Thought for your readers',
    img: `${process.env.ASSETS_BASE}/illustrations/125.svg`,
    description: 'Our platform is optimized to offer the best loading experience. We have reduced the loading times to boost your views',
    feats: [
      'Image size reduction',
      'Asynchronous load'
    ]
  }
];

const changeTab = (e, tab, cb) => {
  e.preventDefault();

  cb(tab);

};

export default function Features() {
  const [tab, setTab] = useState(0);

  return <div id="features" className="bg-white flex items-center flex-col py-8">
    <div className="text-center">
      <div className='my-8'>
        <div className="text-4xl font-bold text-main-700">
          <FormattedMessage id='FEATURES'/>
        </div>
        <h3>
          <FormattedMessage id='Thinking on you and your readers'/>
        </h3>
      </div>
      <p className="my-8 px-4 max-w-2xl">
        <FormattedMessage id={'Take your time, focus on writing, we\'ll take care of deliver your content in all your social media with one click. Once inside we offer the right content to the right person'}/>
      </p>
    </div>
    <ul className="flex" id="argoTabs" role="tablist">
      <li className='mx-1 my-8'>
        <button className={`${tab === 0 ? 'bg-white text-main-500' : 'bg-main-500 text-white'} rounded-full py-2 px-4`} onClick={e => changeTab(e, 0, setTab)} data-toggle="tab" role="tab" aria-controls="tab-1" aria-selected={tab === 0 ? 'true' : 'false'}>
          <FormattedMessage id='Promote'/>
        </button>
      </li>
      <li className='mx-1 my-8'>
        <button className={`${tab === 1 ? 'bg-white text-main-500' : 'bg-main-500 text-white'} rounded-full py-2 px-4`} onClick={e => changeTab(e, 1, setTab)} data-toggle="tab" role="tab" aria-controls="tab-2" aria-selected={tab === 1 ? 'true' : 'false'}>
          <FormattedMessage id='Delight'/>
        </button>
      </li>
      <li className='mx-1 my-8'>
        <button className={`${tab === 2 ? 'bg-white text-main-500' : 'bg-main-500 text-white'} rounded-full py-2 px-4`} onClick={e => changeTab(e, 2, setTab)} data-toggle="tab" role="tab" aria-controls="tab-3" aria-selected={tab === 2 ? 'true' : 'false'}>
          <FormattedMessage id='Retain'/>
        </button>
      </li>
    </ul>
    <div className="relative w-full" >
      {
        features.map((e, i) => <FeatureTab key={e.title + '1'} tab={tab} index={i} {...e}/>)
       }
    </div>
  </div>;
}
