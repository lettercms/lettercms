import Input from '@/components/input';
import {metaInputs} from './metaInputs.module.css';

export default function MetaInputs({categories, onFocus, onBlur}) {
  return <div className={metaInputs}>
    <Input label='Enlace' type='url' onFocus={onFocus} onBlur={onBlur}/>
    <Input label='Descripción' type='textarea' onFocus={onFocus} onBlur={onBlur}/>
    {
      categories?.length > 0 &&
      <select onFocus={onFocus} onBlur={onBlur}>
        {
          categories.map(e => <option key={e}/>)
        }
      </select>
    }
  </div>;
}
