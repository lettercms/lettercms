import {useEffect, useState} from 'react';
import asyncImportScript from '@/lib/asyncImportScript';
import createEditor from './lib/createEditor';
import EditorLoad from './editorLoad';

let editor = null;

export default function CreateEditor({content}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    asyncImportScript('ck-script', process.env.NODE_ENV === 'production' ? 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/editor/ckeditor.js' : 'http://localhost:3003/ckeditor.js', {defer: true, async: true})
    .then(() => {
      createEditor(content)
        .then(e => {
          editor = e;
          setLoading(false);
        });
    });

    return () => {
      if (editor)
        editor.destroy();
    }
  }, []);
  
  let load = null;

  if (loading)
    load = <EditorLoad/>;

  return <div id='ck'>
    {load}
    <style jsx global>{`
      .ck-editor {
        ${loading ? 'display: none !important;' : ''}
        max-width: 97%;
        margin: auto !important;
      }
      .ck-editor__editable {
        border: none !important;
        padding: 0 7.5% 5rem !important;
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
  </div>
}