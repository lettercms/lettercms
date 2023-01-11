import {useIntl} from 'react-intl';
import {buttons, send, save} from './buttons.module.css';
import {useData} from './index';

import Eye from '@/components/svg/preview';
import Save from '@/components/svg/save';
import Send from '@/components/svg/send';

export default function Buttons({postStatus, onPreview, onSave, onPublish, isSaved}) {
  const [data] = useData();
  const intl = useIntl();

  return <div className={buttons}>
    <button
      className={save}
      disabled={data.loading}
      title={
        intl.formatMessage({
          id: 'Preview'
        })
      }
      onClick={onPreview}
    >
      <Eye fill='#5f4dee'/>
    </button>
    <button
      className={save}
      disabled={data.loading || isSaved}
      title={
        postStatus === 'published'
          ? intl.formatMessage({
            id: 'Convert to draft'
          })
          : intl.formatMessage({
            id: 'Save'
          })
        }
      onClick={onSave}
    >
      <Save fill='#5f4dee'/>
    </button>
    <button
      className={send}
      disabled={data.loading}
      title={
        postStatus === 'published'
          ? intl.formatMessage({
            id: 'Update'
          })
          : intl.formatMessage({
            id: 'Publish'
          })
      }
      onClick={onPublish}
    >
      <Send fill='#fff'/>
    </button>
  </div>;
}