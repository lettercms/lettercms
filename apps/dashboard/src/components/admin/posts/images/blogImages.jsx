import {useEffect, useState} from 'react';
import List from './list';
import Load from './load';
import NoImage from './blogNoImages';
import sdk from '@lettercms/sdk';
import Upload from '@/components/svg/upload';
import ImageHandler from '@/lib/ImageHandler';
import {useUser} from '@/lib/dashboardContext';

const imageUploader = new ImageHandler();

export default function BlogImages({onSelect}) {
  const {blog} = useUser();
  const [images, setImages] = useState([]);
  const [isLoading, setLoadState] = useState(true);

  const upload = () => {
    let fileInput = document.querySelector('input.davidsdevel-image[type=file]');

    if (fileInput === null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
      fileInput.classList.add('davidsdevel-image');

      fileInput.onchange = async ({ target }) => {
        
        const { files } = target;

        const file = files[0];

        if (!files || !files.length)
          return;

        try {
          setLoadState(true);
          const {url} = await imageUploader.upload(file, blog.subdomain);
          setImages(Object.assign([], [url], images));
          setLoadState(false);
        } catch(err) {
          alert('Error al subir la imagen');

          setLoadState(false);
          
          throw err;
        }

        fileInput.value = '';
      };
    }

    fileInput.click();
  };

  useEffect(() => {
    sdk.images.all()
      .then(({data}) => {
        setImages(data);
        setLoadState(false);
      });
  }, []);

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