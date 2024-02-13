import {Fragment} from 'react';
import Option from './option';
import menu from './menu';
import {asideHr} from './index.module.css';

export default function Nav({role}) {
  return <>
    {
      menu
        .filter(e => !e.admin || role === 'admin')
        .map((e, i) =>
          <Fragment key={e.name}>
            {i !== 0 && <hr className={asideHr}/>}
            <Option role={role} {...e}/>
          </Fragment>
        )
    }
  </>;
}