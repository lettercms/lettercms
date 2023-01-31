import {FormattedMessage} from 'react-intl';
import {Fragment} from 'react';
import {option} from './option.module.css';
import Option from './option';
import Link from 'next/link';
import menu from './menu';
import {asideHr} from './index.module.css';
import Router from 'next/router';


export default function Nav({role, blog}) {
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