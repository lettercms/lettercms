import {Component} from 'react';
import asyncImport from '@/lib/asyncImportScript';
import sdk from '@lettercms/sdk';
import AccountLoad from './accountLoad';
import Modal from '../../modalBase';
import ImageUploader from '@/lib/ImageHandler';
import Image from 'next/image';

let UI;
const isDev = process.env.NODE_ENV !== 'production';

export default class AccountConfig extends Component {
  state = {
    loading: true,
    photo: '',
    name: '',
    lastname: '',
    website: '',
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    description: '',
    ocupation: '',
    role: '',
    showModal: false,
    previewImage: '',
    fullImage: '',
    edit: true
  }
  async componentDidMount() {
    try {
      await asyncImport(
        'cropper-js',
        isDev
          ? 'http://localhost:3003/editor/cropper.css'
          : 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css',
        'css'
      );

      await asyncImport(
        'cropper-css',
        isDev
          ? 'http://localhost:3003/editor/cropper.js'
          : 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js'
      );
    
      const me = await sdk.accounts.me([
        'photo',
        'name',
        'lastname',
        'website',
        'twitter',
        'facebook',
        'instagram',
        'linkedin',
        'description',
        'ocupation',
        'role'
      ]);

      let mod = await import('./accountUI');
      UI = mod.default;

      this.setState({
        ...me,
        userDescription: me.description,
        loading: false
      });
    } catch(err) {
      throw err;
    }
  }
  closeModal = () => {
    this.cropper.destroy();

    this.setState({
      showModal: false,
      edit: true
    });
  }
  uploadImage = () => {
    try {
      this.canvas.toBlob(async file => {

        const body = new FormData();

        body.append('file', file);

        const res = await fetch('https://lettercms-api.vercel.app/api/image', {
          method: 'POST',
          headers: {
            Authorization: sdk.accessToken
          },
          body
        });

        const {url} = await res.json();

        sdk.accounts.update(this.state._id, {
          photo: url
        });

        this.setState({
          photo: this.canvas.toDataURL()
        });

        this.closeModal();

        delete window.crop;
      });
    } catch(err) {
      alert('Error al subir la foto de perfil');

      throw err;
    }

  }
  onChangePicture = ({target: {files}}) => {
    const file = files[0];

    const imageUrl = URL.createObjectURL(file);
    const img = document.getElementById('cropper');

    img.src = imageUrl;

    window.crop = this.cropper = new Cropper(img, {
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

    this.setState({
      showModal: true,
      fullImage: imageUrl
    });
  }
  cancelCrop = () => {
    this.setState({
      edit:true
    });

    setTimeout(() => {
      const img = document.getElementById('cropper');

      window.crop = this.cropper = new Cropper(img, {
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
    }, 100);
  }
  cropDone = () => {
    this.canvas = this.cropper.getCroppedCanvas({
      width: 400,
      height: 400,
    });

    this.setState({
      previewImage: this.canvas.toDataURL(),
      edit: false
    });

    this.cropper.destroy();
  }
  changePicture = () => {
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = this.onChangePicture;

    input.click();
  }
  handleData = ({target: {name, value}}) => {
    this.props.handleInput({
      target: {
        name,
        value
      }
    }, this.state._id);

    this.setState({
      [name]: value
    });
  }
  render = () => {
    const {state} = this;

    return <div>
      {
        state.loading
          ? <AccountLoad/>
          : <UI {...state} onPictureClick={this.changePicture} onChange={this.handleData}/>
      }
      <Modal show={state.showModal} close={this.closeModal}>
      {
        state.edit ?
        <div key='edit'>
          <img alt='Asset' key='edit-image' src={state.fullImage || ''} id='cropper' style={{display: 'block', maxWidth: '100%', width:400, height: 400}}/>
          <button className='black' style={{marginTop: 10}} onClick={this.cropDone}>Done</button>
        </div>
        :
        <div key='preview'>
          <img alt='Asset' key='preview-image' src={state.previewImage || ''} style={{borderRadius: '50%', display: 'block', maxWidth: '100%', width:400, height: 400}}/>
          <div className='flex' style={{width:   400, marginTop: 10}}>
            <button className='gray' onClick={this.uploadImage}>Save</button>
            <button className='black' onClick={this.cancelCrop}>Cancel</button>
          </div>
        </div>
      }
      </Modal>
      <style jsx global>{`
        .cropper-view-box,
        .cropper-face {
          border-radius: 50%;
        }
      `}</style>
    </div>;
  }
}
