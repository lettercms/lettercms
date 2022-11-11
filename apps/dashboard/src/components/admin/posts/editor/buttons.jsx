import {buttons, send, save} from './buttons.module.css';

import Eye from '@/components/svg/preview';
import Save from '@/components/svg/save';
import Send from '@/components/svg/send';

export default function Buttons({sending, postStatus, onPreview, onSave, onPublish, isSaved}) {
  return <div className={buttons}>
    <button className={save} disabled={sending} title='Vista Previa' onClick={onSave}>
      <Eye fill='#5f4dee'/>
    </button>
    <button className={save} disabled={sending || isSaved} title={postStatus === 'published' ? 'Convertir a Borrador' : 'Guardar'} onClick={onSave}>
      <Save fill='#5f4dee'/>
    </button>
    <button className={send} disabled={sending} title={postStatus === 'published' ? 'Actualizar' : 'Publicar'} onClick={onPublish}>
      <Send fill='#fff'/>
    </button>
  </div>;
}