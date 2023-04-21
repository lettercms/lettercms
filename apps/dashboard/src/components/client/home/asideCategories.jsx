import {Fragment} from 'react';

export default function AsideCategories({categories}) {
  return <div className='flex flex-col items-center w-4/5'>
    <h4 className='font-bold text-sm'>Categorias</h4>
    <ul className='flex flex-col items-center w-full py-4'>
      {
        categories.map(([name, count], i) => {
          return <Fragment key={name}>
            {
              i !== 0 && <hr/>
            }
            <li className='w-full flex justify-between bg-slate-100 rounded-lg p-4'>
              <span className='font-bold'>{name}</span>
              <span>{count}</span>
            </li>
          </Fragment>;
        })
      }
    </ul>
  </div>;
}