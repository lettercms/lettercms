import sdk from '@lettercms/sdk';
import {getStorage, ref, uploadString, uploadBytes} from 'firebase/storage';

export default class ImageHandler {
  upload(file, subdomain) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = (e) => {
        let img = document.createElement('img');
        img.src = e.target.result;

        img.onload = async () => {
          const {str, width, height} = await this.transform(img);

          const splitted = file.name.split('.');
          splitted.pop();

          const path = `${subdomain}/${splitted.join('.')}.webp`;

          const {metadata: {size}} = await this._upload(path, str);

          //TODO: add update Storage Size
          console.log(size);

          resolve()
        };
      };

      reader.readAsDataURL(file);
    });
  }
  async transform (image) {
    return new Promise((resolve) => {

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      ctx.drawImage(image, 0, 0);

      canvas.toBlob(blob => {
        resolve({
          str: blob,
          width: image.naturalWidth,
          height: image.naturalHeight
        });

      }, 'image/webp', .5);

    });
  }
  async uploadProfilePic(file) {
    const {subdomain, _id} = await sdk.accounts.me(['subdomain']);

    const path = `${subdomain}/${_id}/profile.jpg`;

    file.name = 'profile.png';
    file.filename = 'profile.png';

    const picURL = await this._upload(path, file);

    return sdk.accounts.update(_id, {
      photo: picURL
    });
  }
  async _upload(path, file) {
    const storage = getStorage();
    const _ref = ref(storage, path);

    try {

      return uploadBytes(_ref, file, {
        cacheControl: 'public, s-maxage=31536000',
        customMetadata: {
          width,
          height
        }
      })
    } catch(err) {
      return Prmoise.reject(err)
    }
  }
}
