import Input from '@/components/input';
import {metaInputs} from './metaInputs.module.css';
import {useData} from './index';

export default function MetaInputs({categories, onFocus, onBlur, onChange}) {
  const [data, setData] = useData();

  return <div className={metaInputs}>
    <Input disabled={data.loading} label='Enlace' type='url' onChange={({target: {value}}) => setData('url', value)} onFocus={onFocus} onBlur={onBlur} value={data.url}/>
    <Input disabled={data.loading} label='Descripción' type='textarea' onChange={({target: {value}}) => setData('description', value)} onFocus={onFocus} onBlur={onBlur} value={data.description}/>
    {
      categories?.length > 0 &&
      <>
        <span>Categoría</span>
        <select value={data.category} onFocus={onFocus} onBlur={onBlur} onChange={({target: {value}}) => setData('category', value)}>
           <option value=''>Sin Categoría</option>
          {
            categories.map(e => <option key={e} value={e}>{e}</option>)
          }
        </select>
      </>
    }
  </div>;
}
