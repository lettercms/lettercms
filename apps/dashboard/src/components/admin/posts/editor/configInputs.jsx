import {metaInputs} from './metaInputs.module.css';
import {useData} from './index';

export default function MetaInputs({hasFacebook, hasInstagram}) {
  const [data, setData, setPromote] = useData();

  return <div className={metaInputs}>
    <div className='selection'>
      <input type='checkbox' name='protect' id='protect' checked={data.isProtected} onChange={() => setData('isProtected', !data.isProtected)}/>
      <label className='option' htmlFor='protect'>
        <span>Proteger</span>
      </label>
    </div>
    {
      (hasFacebook || hasInstagram) &&
      <>
        <hr/>
        <div>
          <span>Promocionar en</span>
          {
            hasFacebook &&
            <div className='selection'>
              <input type='checkbox' name='checkFacebook' id='checkFacebook' checked={data.promote.facebook} onChange={() => setPromote('facebook', !data.promote.facebook)}/>
              <label className='option' htmlFor='checkFacebook'>
                <img alt='' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/facebook.svg'/>
                <span>Facebook</span>
              </label>
            </div>
          }
          {
            hasInstagram &&
            <div className='selection'>
              <input type='checkbox' name='checkInstagram' id='checkInstagram' checked={data.promote.instagram} onChange={() => setPromote('instagram', !data.promote.instagram)}/>
              <label className='option' htmlFor='checkInstagram'>
                <img alt='' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/instagram.svg'/>
                <span>Instagram</span>
              </label>
            </div>
          }
        </div>
      </>
    }
  </div>;
}
