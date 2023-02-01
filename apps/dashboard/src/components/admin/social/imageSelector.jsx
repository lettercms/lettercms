import Input from '@/components/input';
import {FormattedMessage, useIntl} from 'react-intl';
import {useState, useEffect, useRef} from 'react';
import asyncImport from '@/lib/asyncImportScript';
import sdk from '@lettercms/sdk';
import Button from '@/components/button';
import {getStorage, ref, uploadBytes, getMetadata} from 'firebase/storage';
import {useUser} from '@/components/layout';

let canvas = null;
let cropper = null;
let originalImg = '';
let croppedImg = '';
let editRatio = null;

const cropperOpts = {
  viewMode: 3,
  autoCropArea: 1,
  dragMode: 'move',
  restore: false,
  responsive: true,
  center: false,
  highlight: false,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: false
};

const uploadImage = (subdomain, onUnload, intl) => {
  try {
    canvas.toBlob(async file => {
      //Generate Random temp name
      const random = parseInt(Math.random() * 10e10);
      const tempName = a.toString(16);

      const storage = getStorage();

      const path = `${subdomain}/${tempName}.webp`;

      const _ref = ref(storage, path);

      const {metadata: {size}} = await uploadBytes(_ref, file, {
        cacheControl: 'no-cache, no-store, max-age=0, must-revalidate'
      });

      fetch('/api/usage/update', {
        method: 'PATCH',
        body: JSON.stringify({
          size
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: sdk.accessToken
        }
      });

      onUnload(`https://usercontent-davidsdevel-lettercms.vercel.app/${path}`);
    }, 'image/webp');
  } catch(err) {
    alert(
      intl.formatMessage({
        id: 'Error uploading image'
      })
    );

    throw err;
  }
};
const onChangePicture = (file, cb) => {
  const imageUrl = URL.createObjectURL(file);
  const img = document.getElementById('cropper');

  img.src = originalImg = imageUrl;

  cropper = new Cropper(img, {
    ...cropperOpts,
    aspectRatio: editRatio
  });

  cb();
};
const onUrlPicture = ({target, code}, cb) => {
  if (code === 'Enter') {
    const {value} = target;

    originalImg = value;

    cb();
  }
};
const onClickUrl = (ratio, cb) => {
  editRatio = ratio;

  const img = document.getElementById('cropper');

  img.src = originalImg;

  cropper = new Cropper(img, {
    ...cropperOpts,
    aspectRatio: editRatio
  });

  cb();
};
const cancelCrop = (cb) => {
  cb();

  setTimeout(() => {
    const img = document.getElementById('cropper');

    img.src = originalImg;

    cropper = new Cropper(img, {
      ...cropperOpts,
      aspectRatio: editRatio
    });
  }, 100);
};
const cropDone = (onCrop) => {
  canvas = cropper.getCroppedCanvas();

  croppedImg = canvas.toDataURL();
  cropper.destroy();
  
  onCrop();
};

const changePicture = (ratio, cb) => {
  editRatio = ratio;

  const input = document.createElement('input');

  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = ({target: {files}}) => onChangePicture(files[0], cb);

  input.click();
};


const SelectRatio = ({onClick, onChange, image}) => <div id='aspect-main'>
  <span>
    <FormattedMessage id='Select aspect ratio'/>
  </span>
  <div id='aspect-container'>
    <div className='aspect' onClick={() => {image ? onClickUrl(5/4, onChange) : onClick(5/4, onChange);}} style={{width: '10rem', height: '8rem'}}>4:5</div>  
    <div className='aspect' onClick={() => {image ? onClickUrl(1/1.91, onChange) : onClick(1/1.91, onChange);}} style={{width: '4.2rem', height: '8rem'}}>1:1.91</div>
  </div>
  <style jsx>{`
    #aspect-main {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #aspect-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .aspect {
      cursor: pointer;
      background: #ccd7ec;
      opacity: .5;
      border-radius: .5rem;
      margin: 0 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: ease .3s;
    }
    .aspect:hover {
      opacity: 1;
    }
  `}</style>
</div>;

const UploadMethod = ({onClickUpload}) => {
  const [url, setUrl] = useState('');
  const intl = useIntl();

  return <div>
    <Input
      id='url'
      value={url}
      onChange={({target: {value}}) => setUrl(value)}
      onKeyUp={e => onUrlPicture(e, onClickUpload)}
      label={
        intl.formatMessage({
          id: 'URL'
        })
      }
    />
    <hr/>
    <Button style={{width: '100%'}} type='solid' onClick={onClickUpload}>
      <FormattedMessage id='Upload image'/>
    </Button>{/*
      <hr/>
      <button>Seleccionar de la galeria</button>*/}
  </div>;
};

const ImageSelector = ({show, onAppend}) => {
  const [step, changeStep] = useState('select');
  const {blog} = useUser();
  const cropperRef = useRef();
  const intl = useIntl();

  useEffect(() => {
    if (!show) {
      canvas = null;
      originalImg = '';
      croppedImg = '';
      editRatio = null;

      setTimeout(() => {
        cropper?.destroy();

        if (cropperRef.current)
          cropperRef.current.src = '';

        changeStep('select');
      }, 700);
    }

  }, [show]);

  useEffect(() => {
    asyncImport(
      'cropper-js',
      'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css',
      'css'
    );
    asyncImport(
      'cropper-css',
      'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js'
    );

    return () => {
      cropper?.destroy();

      document.getElementById('cropper-css').remove();
      document.getElementById('cropper-js').remove();
    };
  }, []);

  return <div>
    {
      step === 'select' &&
      <UploadMethod onClickUpload={() => changeStep('aspect')}/>
    }
    {
      step === 'aspect' &&
      <SelectRatio onClick={changePicture} image={originalImg} onChange={() => changeStep('edit')}/>
    }
    {
      step !== 'upload' &&
      <img ref={cropperRef} id='cropper' style={{height: step === 'edit' ? 300 : null}} alt=''/>
    }
    {
      step === 'edit' &&
      <Button type='solid' onClick={() => cropDone(() => changeStep('upload'))}>
        <FormattedMessage id='Crop'/>
      </Button>
    }
    {
      step === 'upload' &&
      <>
        <img src={croppedImg} style={{height: 300}} alt=''/>
        <Button type='solid' onClick={() => uploadImage(blog.subdomain, onAppend, intl)}>
          <FormattedMessage id='Done'/>
        </Button>
        <Button type='solid' onClick={() => cancelCrop(() => changeStep('edit'))}>
          <FormattedMessage id='Cancel'/>
        </Button>
      </>
    }
    <style jsx>{`
      hr {
        margin: 2rem 0;
      }
      :global(.cropper-container),
      img {
        margin: 1rem auto;
        display: block;
      }
    `}</style>
  </div>;
};

export default ImageSelector;
