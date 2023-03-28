import {useState} from 'react';
import {useIntl} from 'react-intl';
import {useData} from './index';
import EditorLoad from './editorLoad';
import dynamic from 'next/dynamic';
import plugin from './lib/plugin';
import BallonEditor from '@ckeditor/ckeditor5-build-balloon-block';

const CKEditor = dynamic(async () => {
  const ck = await import('@ckeditor/ckeditor5-react');

  return ck.CKEditor;
}, {
  ssr: false
});

export default function Editor({onOpenModal}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useData();
  const intl = useIntl();

  return <div>
      {  
        loading &&
        <EditorLoad/>
      }
      <CKEditor
        config={{
          extraPlugins: [
            plugin(
              () => onOpenModal(false),
              data,
              setData
            )
          ]
        }}
        editor={ BallonEditor }
        data={
          data.content
            ? data.content
            : intl.formatMessage({
              id: '<p>New super post</p>'
            })
        }
        onReady={ editor => {
          editor.model.schema.extend('imageBlock', { allowAttributes: ['data-src', 'data-width'] });

          setLoading(false);

          //Handle click on image
          const input = document.querySelector('.ck-file-dialog-button').children[1];

          input.onclick = e => {
            e.preventDefault();

            onOpenModal(true);
          };

          //Get images on loading
          const content = document.querySelector('.ck-content');

          if (content) {
            const images = content.getElementsByTagName('img');

            if (images?.length > 0) {

              const im = Array.from(images).map(e => e.dataset.src ? e.dataset.src : e.src);

              setData('images', im);
            }
          }
        }}
        onChange={(_, editor) => {
          const content = editor.getData();

          //Get content images on change
          const ck = document.querySelector('.ck-content');
          const images = ck.getElementsByTagName('img');

          if (images?.length > 0) {
            const im = Array.from(images).map(e => e.dataset.src ? e.dataset.src : e.src);

            setData('images', im);
          }

          setData('content', content);
        }}
        onError={err => {
          throw err;
        }}
      />
      <style jsx global>{`
        .ck-editor {
          ${loading ? 'display: none !important;' : ''}
          max-width: 97%;
          margin: auto !important;
        }
        .ck-editor__editable {
          border: none !important;
          padding: 0 10% 5rem 0 !important;
          margin-left: 10%;
        }
        .ck-focused {
          box-shadow: none !important; 
        }
        .ck-toolbar {
          background: #fff !important;
          border: none !important;
        }
        .ck.ck-sticky-panel__content.ck-sticky-panel__content_sticky {
          top: 59px;
          box-shadow: none !important;
        }
      `}</style>
    </div>;
}

