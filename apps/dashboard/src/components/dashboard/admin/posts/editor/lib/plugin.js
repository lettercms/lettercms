import {figureToImageBlock, imageToDataFigure, imageToEditFigure, imageDimensionsToDataFigure} from './converters';
import {EventEmitter} from 'events';

const  EditorPlugin = (closeModal, data, setData) => editor => {
  
  window.editorEventEmitter = new EventEmitter();

  editor.conversion.for( 'upcast' ).elementToElement(figureToImageBlock);
  editor.conversion.for('dataDowncast').add(imageToDataFigure);
  editor.conversion.for('dataDowncast').add(imageDimensionsToDataFigure);
  editor.conversion.for( 'editingDowncast' ).add(imageToEditFigure);

  window.editorEventEmitter.on('insert', source => {
    const frag = editor.model.change( writer => {

      const image = writer.createElement('imageBlock', source);
      const docFrag = writer.createDocumentFragment();

      writer.append(image, docFrag);

      return docFrag;
    });

    editor.model.insertContent(frag, editor.model.document.selection);

    closeModal();
  });
  
  window.editorEventEmitter.on('unsplash', ({user, href, src, download}) => {
    fetch('/api/track-image?url='+download.replace('https://api.unsplash.com/photos', ''));

    const frag = editor.model.change( writer => {

      const image =        writer.createElement('imageBlock', src);

      const container =    writer.createElement('paragraph', {alignment: 'center'});
      const photo =        writer.createText('Photo by ');
      const userText =     writer.createText(user, {linkHref: href});
      const on =           writer.createText(' on ');
      const unsplashA =    writer.createText('Unsplash', {linkHref: 'https://unsplash.com/?utm_source=lettercms&utm_medium=referral'});
      const docFrag =      writer.createDocumentFragment();

      writer.append(photo, container);
      writer.append(userText, container);
      writer.append(on, container);
      writer.append(unsplashA, container);

      writer.append(image, docFrag);
      writer.append(container, docFrag);

      return docFrag;
    });

    editor.model.insertContent(frag, editor.model.document.selection);

    closeModal();
  });

};

export default EditorPlugin;