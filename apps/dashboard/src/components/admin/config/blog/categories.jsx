import Categories from '../blogCategories';
import Input from '../../../input';

const BlogCategories = ({categories, category, alias, onChange, onAddCategory, onDeleteCategory}) => <div>
  <Input id='category' value={category} onInput={onChange} label='Nombre'/>
  <Input id='alias' value={alias} onInput={({target: {value, name}}) => this.setState({[name]: value})} label='Alias'/>
  <button onClick={() => onAddCategory(category, alias)} className="black">Añadir</button>
  {
    categories?.length > 0
    && <Categories categories={categories} setCategories={onDeleteCategory}/>
  }
</div>;

export default BlogCategories;