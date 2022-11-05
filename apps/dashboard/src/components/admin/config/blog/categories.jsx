import Categories from '../blogCategories';
import Input from '@/components/input';
import Button from '@/components/button';
import {useState} from 'react';

export default function BlogCategories({categories, onAdd, onDelete}) {
  const [categoryName, setName] = useState('');

  const addCategory = () => {
    onAdd(categoryName);
    setName('');
  };

  return <div>
    <Input id='category' value={categoryName} onChange={({target: {value}}) => setName(value)} label='CategorÍa'/>
    <Button type='solid' onClick={addCategory}>Añadir</Button>
    {
      categories?.length > 0
      && <Categories categories={categories} onDelete={onDelete}/>
    }
  </div>;
}
