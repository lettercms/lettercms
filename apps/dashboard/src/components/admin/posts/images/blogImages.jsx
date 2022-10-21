import {useEffect, useState} from 'react';
import List from './list';
import Load from './load';
import NoImage from './blogNoImages';
import sdk from '@lettercms/sdk';
import Upload from '@/components/svg/upload';
import createUploader from '@/lib/createUploader';
import {useUser} from '@/lib/dashboardContext';

export default function BlogImages({onSelect, isHidden}) {
  const {blog} = useUser();
  const [images, setImages] = useState([]);
  const [isLoading, setLoadState] = useState(true);

  const upload = () => createUploader({
    onLoadStart() {
      setLoadState(true);
    },
    onLoadEnd(url) {
      setLoadState(false);
      setImages(Object.assign([], [url], images));
    },
    onError(err) {
      alert('Error al subir la imagen');
      setLoadState(false);  

      throw err;
    }
  });

  useEffect(() => {
    if (!isHidden) {
      sdk.images.all()
        .then(({data}) => {
          setImages(data);
          setLoadState(false);
        });
    }
  }, [isHidden]);

  let ui = null;

  if (isLoading)
    ui = <Load/>;

  if (!isLoading && images.length > 0)
    ui = <List images={images} isUploading={isLoading} onSelect={onSelect}/>;

  if (!isLoading && images.length === 0)
    ui = <NoImage/>;

  return <>
    {ui}
    <button className='btn-outline-sm upload' onClick={upload}>
      <Upload style={{width: '1.25rem'}}/>
    </button>
    <style jsx>{`
      button {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        padding: 0;
        position: absolute;
        bottom: 2rem;
        right: 2rem;
      }
      :global(button.upload svg) {
        fill: #5f4dee !important;
      }
      :global(button.upload:hover svg) {
        fill: white !important;
      }
    `}</style>
  </>;
}