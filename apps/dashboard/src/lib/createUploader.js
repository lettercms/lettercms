import ImageHandler from './ImageHandler';

const imageUploader = new ImageHandler();

export default function createUploader({name, subdomain, onLoadStart, onLoadEnd, onData, onError}) {
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
        onLoadStart();

        const url = await imageUploader.upload(file, subdomain, name);

        onLoadEnd(url);
      } catch(err) {
        alert('Error al subir la imagen')

        onError(err);
      }

      fileInput.value = '';
    };
  }

  fileInput.click();
}
