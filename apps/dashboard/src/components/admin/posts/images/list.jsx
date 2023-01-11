import {FormattedMessage} from 'react-intl';
import Modal from './imageModal';
import {useState, useEffect} from 'react';
import Button from '@/components/button';

export default function ImageList({images, isUploading, onLoadMore, isLoadingMore, onSelect}) {
  const [isLoading, setLoad] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [meta, setMeta] = useState({});
  const [selectedImage, setSelectedImage] = useState({});

  useEffect(() => {
    setLoad(false);
  }, [images]);

  return <ul>
    {
      isUploading
      && <li id="upload">
        <img alt='Asset' src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/spinner.svg" className="rotating" />
      </li>
    }
    {/*
      images.map((e, i) => <li key={e.url}>
        <img src={e.thumbnail}/>
      </li>)
    */}
    {
      images.map((e, i) => <li key={e.url} onClick={() => {
        setMeta({
          raw: e.raw || e.url,
          user: e.user?.name,
          href: e.user?.profile,
          download: e.download,
          width: e.width,
          height: e.height
        });
        setSelectedImage(e.url);
        setShowModal(true);
      }}>
        <div className='image-thumb' style={{
          backgroundImage:`url(${e.thumbnail || e.url}&w=250)`
        }}>
        <div className='image-overflow'/>
        </div>
      </li>)
    }
    {
      isLoadingMore
      && <li id="upload">
        <img alt='Asset' src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/spinner.svg" className="rotating" />
      </li>
    }
    <div id='button-container'>
      <Button type='outline' loading={isLoading} onClick={onLoadMore}>
        <FormattedMessage id='Load more'/>
      </Button>
    </div>
    {
      showModal &&
      <Modal show={showModal} img={selectedImage} meta={meta} onClose={() => {
        setShowModal(false);
        setSelectedImage('');
        setMeta({});
      }} onSelect={onSelect}/>
    }
    <style jsx>{`
      
        ul {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          padding: 0 1rem;
        }
        ul li {
          width: 18%;
          height: 8rem;
          list-style: none;
          margin: .5rem 0;
        }
        ul li img {
          height: 120px;
        }
        ul li .image-thumb  {
          position: relative;
          background-position: center;
          background-size: cover;
          width: 100%;
          height: 100%;
        }
        ul li .image-thumb .image-overflow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,.5);
          cursor: pointer;
          border-radius: 5px;

          display: none;
        }
        ul li .image-thumb:hover .image-overflow {
          display: block;
        }
        ul li .image-thumb .image-overflow img {
          width: 15%;
          position: absolute;
          right: 5%;
          top: 5%;
        }
        ul li#upload {
          background: #7f7f7f;
          border-radius: 5px;
          align-items: center;
          padding: 0;
          justify-content: center;
          display: flex;
        }
        ul li#upload img {
          width: 50%;
          animation: rotation linear infinite 1s;
        }
        #button-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        #button-container button {
          width: 15rem;
        }
        #button-container img {
          width: 2.75rem;
          animation: rotation infinite .6s linear;
        }
    `}</style>
  </ul>;
}
