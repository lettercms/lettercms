import sdk from '@lettercms/sdk';
import {getStorage, ref, uploadBytes} from 'firebase/storage';

export default async function uploadXml(file, type, subdomain) {
  try {

    const path = `${subdomain}/${type}.xml`;

    const storage = getStorage();
      
    const _ref = ref(storage, path);

    await uploadBytes(_ref, file, {
      cacheControl: 'no-cache, no-store, max-age=0, must-revalidate',
      customMetadata: {
        importType: type
      }
    });

    return sdk.createRequest('/post/import', 'POST', {
      type
    });
  } catch(err) {
    return Promise.reject(err);
  }
}
