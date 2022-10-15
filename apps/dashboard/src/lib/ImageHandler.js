import sdk from '@lettercms/sdk';
import {getStorage, ref, uploadBytes, getMetadata} from 'firebase/storage';
import imageCompression from 'browser-image-compression';


export default class ImageHandler {
  getSize(subdomain, name) {
    const storage = getStorage();
    // Child references can also take paths delimited by '/'
    const imgRef = ref(storage, `${subdomain}/${name}.webp`);

    return getMetadata(imgRef);
  }
  upload(file, subdomain, name) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = (e) => {
        let img = document.createElement('img');
        img.src = e.target.result;

        img.onload = async () => {

          let fileName = name;

          if (!fileName) {
            const splitted = file.name.split('.');
            splitted.pop();

            fileName = splitted.join('.');
          }

          const path = `${subdomain}/${fileName}.webp`;
          
          let meta;
          
          try {
            meta = await this.getSize(subdomain, fileName);
          } catch(err) {
            console.log(err)
          }

          const {metadata: {size}} = await this._upload(path, file);

          //TODO: add update Storage Size
          let finalSize = size;

          if (meta) {
            console.log(meta)
            //finalSize = size - meta.metadata.size;
          }

          console.log(finalSize);

          fetch('/api/usage/update', {
            method: 'PATCH',
            body: JSON.stringify({
              size: finalSize
            }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: sdk.accessToken
            }
          });

          resolve(`https://storage.googleapis.com/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/${subdomain}/${fileName}.webp`)
        };
      };

      reader.readAsDataURL(file);
    });
  }
  async compress(image) {
    const options = {
      maxSizeMB: 1,
      useWebWorker: true,
      fileType: 'image/webp',
      initialQuality: 0.7
    }

    try {
      return imageCompression(image, options);
    } catch (error) {
      return Promise.reject(err);
    }
  }
  async uploadProfilePic(file) {
    const {subdomain, _id} = await sdk.accounts.me(['subdomain']);

    const path = `${subdomain}/${_id}/profile.webp`;

    const picURL = await this._upload(path, file, 'profile');

    return sdk.accounts.update(_id, {
      photo: picURL
    });
  }
  async _upload(path, file) {
    const storage = getStorage();
    const _ref = ref(storage, path);
    
    const compressed = await this.compress(file);

    //TODO: get with and height
    try {

      return uploadBytes(_ref, compressed, {
        cacheControl: 'public, s-maxage=31536000',
        /*customMetadata: {
          width: compressed.naturalWidth,
          height: compressed.naturalHeight
        }*/
      })
    } catch(err) {
      return Prmoise.reject(err)
    }
  }
}
