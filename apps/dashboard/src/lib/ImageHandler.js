import sdk from '@lettercms/sdk';
import {getStorage, ref, uploadBytes, getMetadata} from 'firebase/storage';
import imageCompression from 'browser-image-compression';

export default class ImageHandler {
  async getSize(subdomain, name) {
    const storage = getStorage();
    // Child references can also take paths delimited by '/'
    try {
      const imgRef = ref(storage, `${subdomain}/${name}.webp`);

      const meta = await getMetadata(imgRef);

      return meta;
    } catch(err) {
      return null;
    }
  }

  async upload(file, subdomain, name) {
    try {
      let fileName = name;

      if (!fileName) {
        //Get filename from img path
        const splitted = file.name.split('.');
        splitted.pop();

        fileName = splitted.join('.');
      }

      const path = `${subdomain}/${fileName}.webp`;
            
      //Get metadata for overwriten file if exists
      const fileMetadata = await this.getSize(subdomain, fileName);

      const {metadata: {size, width, height}} = await this._upload(path, file);

      let finalSize = size;

      if (fileMetadata?.metadata)
        finalSize -= fileMetadata.metadata.size;

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

      //TODO: add proxy URL
      return {
        width,
        height,
        url: `https://usercontent-davidsdevel-lettercms.vercel.app/${subdomain}/${fileName}.webp`
      };
    } catch(err) {
      return Promise.reject(err);      
    }
  }

  async compress(image) {
    const options = {
      maxSizeMB: 1,
      useWebWorker: true,
      fileType: 'image/webp',
      initialQuality: 0.7
    };

    try {
      return imageCompression(image, options);
    } catch (error) {
      return Promise.reject(err);
    }
  }

  async uploadProfilePic(file) {
    const {subdomain, _id} = await sdk.accounts.me(['subdomain']);

    const path = `${subdomain}/${_id}/profile.webp`;

    const picURL = await this._upload(path, file);

    return sdk.accounts.update(_id, {
      photo: picURL
    });
  }

  async _upload(path, file) {
    const storage = getStorage();
    const _ref = ref(storage, path);

    const imgString = await imageCompression.getDataUrlFromFile(file);

    const customMetadata = await new Promise((resolve, reject) => {
      const img = document.createElement('img');

      img.src = imgString;

      img.onload = async function() {
        resolve({
          width: this.width,
          height: this.height
        });
      };

      img.onerror = reject;
    });

    const compressed = await this.compress(file);

    try {
      return uploadBytes(_ref, compressed, {
        cacheControl: 'no-cache, no-store, max-age=0, must-revalidate',
        customMetadata
      });
    } catch(err) {
      return Prmoise.reject(err);
    }
  }
}
