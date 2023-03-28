import {FormattedMessage, useIntl} from 'react-intl';
import Categories from '../blogCategories';
import Input from '@/components/input';
import Button from '@/components/button';
import {useState} from 'react';

export default function BlogCategories({categories, onAdd, onDelete}) {
  const [categoryName, setName] = useState('');

  const intl = useIntl();

  const addCategory = () => {
    onAdd(categoryName);
    setName('');
  };

  return <div>
    <Input id='category' value={categoryName} onChange={({target: {value}}) => setName(value.toLowerCase())} label={intl.formatMessage({id: 'Category'})}/>
    <Button type='solid' onClick={addCategory}>
      <FormattedMessage id='Add'/>
    </Button>
    {
      categories?.length > 0
      && <Categories categories={categories} onDelete={onDelete}/>
    }
  </div>;
}
