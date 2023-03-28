import {useIntl, FormattedMessage} from 'react-intl';
import Input from '@/components/input';

function BlogTitle({title, description, onChangeTitle, onChangeDescription, onChangeVisible, isVisible = false}) {
  const intl = useIntl();

  return <div>
    <Input id='title' value={title} onChange={onChangeTitle} label={intl.formatMessage({id: 'Title'})}/>
    <Input id='description' value={description} onChange={onChangeDescription} label={intl.formatMessage({id: 'Description'})}/>
    <div className='selection'>
      <input type='checkbox' name='isVisible' id='isVisible' checked={isVisible} onChange={onChangeVisible}/>
      <label className='option' htmlFor='isVisible'>
        <span>
          <FormattedMessage id='Visible blog'/>
        </span>
      </label>
    </div>
  </div>;
}

export default BlogTitle;
