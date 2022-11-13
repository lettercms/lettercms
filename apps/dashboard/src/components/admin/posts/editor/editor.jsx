import {useState} from 'react';
import {useData} from './index';
import EditorLoad from './editorLoad';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import BallonEditor from '@ckeditor/ckeditor5-build-balloon-block';

let editor = null;

export default function Editor({onOpenModal}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useData();

  return <div>
      {  
        loading &&
        <EditorLoad/>
      }
      <CKEditor
        editor={ BallonEditor }
        data={data.content ? data.content : '<p>Nueva super entrada</p>'}
        onReady={ editor => {

          setLoading(false);

          //Handle click on image
          const input = document.querySelector('.ck-file-dialog-button').children[1];

          input.onclick = e => {
            e.preventDefault();

            onOpenModal(true);
          };

          //Get images on load
          let images = document.querySelector('.ck-content').getElementsByTagName('img');

          if (images?.length > 0) {

            let im = Array.from(images).map(e => e.dataset.src ? e.dataset.src : e.src);

            setData('images', im);
          }
        }}
        onChange={ ( event, editor ) => {
          console.log(event)
          //TODO: Add thumbnails changes
          setData('content', editor.getData());

        }}
        onError={console.log}
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

