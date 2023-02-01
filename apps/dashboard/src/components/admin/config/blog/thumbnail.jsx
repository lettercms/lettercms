import {FormattedMessage} from 'react-intl';
import Camera from '@/components/svg/camera';
import Spinner from '@/components/svg/spinner';
import createUploader from '@/lib/createUploader';
import {useEffect, useState, useRef} from 'react';
import {useUser} from '@/components/layout';
import sdk from '@lettercms/sdk';

export default function Thumbnail({url = 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/article-details-large.jpg', onChangePicture}) {
  const [load, setLoadState] = useState(false);
  const [img, setImg] = useState(url);
  const shadowRef = useRef(null);
  const {status, blog} = useUser();

  const upload = () => createUploader({
    name: 'og',
    subdomain: blog.subdomain,
    onLoadStart() {
      shadowRef.current.style.opacity = 1;
      setImg('');
      setLoadState(true);
    },
    onLoadEnd(_url) {
      shadowRef.current.style.opacity = 0;

      setLoadState(false);
      setImg(_url);

      sdk.blogs.update({
        thumbnail: _url
      }).then(e => {
        onChangePicture(_url);
      });

    },
    onError(err) {
      setLoadState(false);  

      throw err;
    }
  });

  return <div id='thumbnail-container'>
    <div id='thumbnail-img' style={{backgroundImage: `url(${img})`}} alt='' onClick={upload}>
      <div id='thumbnail-shadow' className='flex' ref={shadowRef}>
        {
          load
            ? <Spinner className='rotate' fill='#0009' width='60' height='60'/>
            : <Camera id='camera-icon' fill='#0009' width='60' height='60'/>
        }
      </div>
    </div>
    <div id='thumbnail-text' className='flex flex-column'>
      <span>
        <FormattedMessage id='Upload an image to improve your blog appeal on social media'/>
      </span>
      <span>
        <FormattedMessage id='Image must be at least 640x320 px (recommended 1280 x 640 for best quality)'/>
      </span>
      <a href='#'>
        <FormattedMessage id='Download template'/>
      </a>
    </div>
    <style jsx>{`
      #thumbnail-text {
        align-items: start;
        margin-top: .5rem;
      }
      #thumbnail-container {
        position: relative;
        width: calc(100% - 50px);
        margin: 0 25px 15px;
      }
      #thumbnail-container #thumbnail-img {
        border-radius: 15px;
        width: 100%;
        max-width: 640px;
        height: 320px;
        object-fit: cover;
        object-position: center;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        overflow: hidden;
        position: relative;
        cursor: pointer;
      }
      #thumbnail-container #thumbnail-img #thumbnail-shadow {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #0003;
        justify-content: center;
        transition: ease .3s;
        opacity: 0;
      }
      #thumbnail-container #thumbnail-img:hover #thumbnail-shadow {
        opacity: 1 !important;
      }
    `}</style>
  </div>;
}