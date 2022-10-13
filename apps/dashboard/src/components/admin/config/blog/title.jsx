import Input from '../../../input';

const BlogTitle = ({title, description, onChange, isVisible = false}) => <div>
  <Input id='title' value={title} onInput={onChange} label='Título'/>
  <Input id='description' value={description} onInput={onChange} label='Descripción'/>
  <div className="selection">
    <input type="checkbox" onChange={onChange} name="isVisible" value="isVisible" id="isVisible" checked={isVisible} />
    <label htmlFor="isVisible" className="option">Blog Visible</label>
  </div>
</div>;

export default BlogTitle;
