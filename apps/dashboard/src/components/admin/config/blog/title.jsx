import Input from '../../../input';

const BlogTitle = ({title, description, onChangeTitle, onChangeDescription, onChangeVisible, isVisible = false}) => <div>
  <Input id='title' value={title} onChange={onChangeTitle} label='Título'/>
  <Input id='description' value={description} onChange={onChangeDescription} label='Descripción'/>
  <div className='selection'>
    <input type='checkbox' name='isVisible' id='isVisible' checked={isVisible} onChange={onChangeVisible}/>
    <label className='option' htmlFor='isVisible'>
      <span>Blog Visible</span>
    </label>
  </div>
</div>;

export default BlogTitle;
