import {useState, useEffect} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {useUser} from '@/components/layout';
import Modal from '@/components/modalBase';
import ImageUploader from '@/lib/ImageHandler';
import Image from 'next/image';
import sdk from '@lettercms/sdk';

let cropper = null;
let canvas = null;

const createCropper = img => {
  return new Cropper(img, {
    aspectRatio: 1,
    viewMode: 3,
    autoCropArea: 1,
    dragMode: 'move',
    restore: false,
    center: false,
    highlight: false,
    cropBoxMovable: false,
    cropBoxResizable: false,
    toggleDragModeOnDblclick: false
  });
};

export default function CropperModal({file, onChange}) {
  const [edit, setEdit] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [fullImage, setFullImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const {blog, user} = useUser();

  const intl = useIntl();

  useEffect(() => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const img = document.getElementById('cropper');
      img.src = imageUrl;

      cropper = createCropper(img);

      setFullImage(imageUrl);
      setShowModal(true);
    }

  }, [file]);

  const cropDone = () => {
    canvas = cropper.getCroppedCanvas({
      width: 400,
      height: 400,
    });

    setPreviewImage(canvas.toDataURL());
    setEdit(false);

    cropper.destroy();
  };

  const close = () => {

    setShowModal(false);
    canvas = null;
    setTimeout(() => {
      cropper?.destroy();
      setFullImage('');
      setPreviewImage('');
    }, 600);
  };

  const cancelCrop = () => {
    setEdit(true);

    setTimeout(() => {
      const img = document.getElementById('cropper');

      cropper = createCropper(img);
    }, 0);
  };

  const upload = () => {
    const uploader = new ImageUploader();
    canvas.toBlob(async file => {
      try {
        const {url} = await uploader.upload(file, blog.subdomain, `${user._id}/profile`);
        
        await sdk.accounts.update(user._id, {
          photo: url
        });

        onChange(URL.createObjectURL(file));
        close();

        alert(
          intl.formatMessage({
            id: 'Image updated successfully'
          })
        );
      } catch(err) {
        alert(
          intl.formatMessage({
            id: 'Error updating the image'
          })
        );
      }
    });
  };

  return <Modal show={showModal} close={close} width='500px' height='552px'>
    {
      edit ?
      <div key='edit' id='cropper-edit'>
        <img alt='Asset' key='edit-image' src={fullImage || ''} id='cropper' style={{display: 'block', maxWidth: '100%', width:400, height: 400}}/>
        <button className='black' style={{marginTop: 10}} onClick={cropDone}>
          <FormattedMessage id='Crop'/>
        </button>
      </div>
      :
      <div key='preview'>
        <img alt='Asset' key='preview-image' src={previewImage || ''} style={{borderRadius: '50%', display: 'block', maxWidth: '100%', width:400, height: 400}}/>
        <div className='flex' style={{width:   400, marginTop: 10}}>
          <button className='gray' onClick={upload}>
            <FormattedMessage id='Save'/>
          </button>
          <button className='black' onClick={cancelCrop}>
            <FormattedMessage id='Cancel'/>
          </button>
        </div>
      </div>
    }
    <style jsx global>{`
      #cropper-edit {
        width: 402px;
        height: 402px;
      }
      .cropper-view-box,
      .cropper-face {
        border-radius: 50%;
      }
    `}</style>
  </Modal>;
}