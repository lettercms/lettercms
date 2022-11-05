import Input from '@/components/input';
import {useState, useEffect} from 'react';
import asyncImport from '@/lib/asyncImportScript';
import sdk from '@lettercms/sdk';
import Button from '@/components/button';


const isDev = process.env.NODE_ENV !== 'production';

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
  center: false,
  highlight: false,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: false
};

const uploadImage = (onUnload) => {
  try {
    canvas.toBlob(async file => {
      const body = new FormData();

      body.append('file', file);

      const res = await fetch('https://lettercms-api.vercel.app/api/image', {
        method: 'POST',
        headers: {
          Authorization: sdk.accessToken
        },
        body
      });

      const data = await res.json();
      
      onUnload(data.url);
    });
  } catch(err) {
    alert('Error al subir la foto de perfil');

    throw err;
  }
};
const onChangePicture = (file, cb) => {
  const imageUrl = URL.createObjectURL(file);
  const img = document.getElementById('cropper');

  img.src = originalImg = imageUrl;

  window.crop = cropper = new Cropper(img, {
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

  window.crop = cropper = new Cropper(img, {
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

    window.crop = cropper = new Cropper(img, {
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
  <span>Selecciona la relación</span>
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

const UploadMethod = ({onClickUpload}) => <div>
  <Input id='url' onKeyUp={e => {onUrlPicture(e, onClickUpload);}} label='Enlace'/>
  <hr/>
  <Button style={{width: '100%'}} type='solid' onClick={onClickUpload}>Subir Imagen</Button>{/*
    <hr/>
    <button>Seleccionar de la galeria</button>*/}
</div>;

const ImageSelector = ({show, onAppend}) => {
  const [step, changeStep] = useState('select');

  useEffect(() => {
    if (!show) {
      canvas = null;
      cropper = null;
      originalImg = '';
      croppedImg = '';
      editRatio = null;
      changeStep('select');

      if (cropper)
        cropper.destroy();
    }
  }, [show]);

  useEffect(() => {
    asyncImport(
      'cropper-js',
      isDev
        ? '/editor/cropper.css'
        : 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css',
      'css'
    );
    asyncImport(
      'cropper-css',
      isDev
        ? '/editor/cropper.js'
        : 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js'
    );

    return () => {
      if (cropper)
        cropper.destroy();

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
      <img id='cropper' style={{height: step === 'edit' ? 300 : null}}/>
    }
    {
      step === 'edit' &&
      <button onClick={() => cropDone(() => changeStep('upload'))}>Cortar</button>
    }
    {
      step === 'upload' &&
      <>
        <img src={croppedImg} style={{height: 300}}/>
        <button onClick={() => uploadImage(onAppend)}>Listo</button>
        <br/>
        <button onClick={() => cancelCrop(() => changeStep('edit'))}>Cancelar</button>
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
