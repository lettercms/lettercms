import {Fragment} from 'react';
import {signOut} from 'next-auth/react';
import {option} from './option.module.css';
import Option from './option';
import PowerOff from '@/components/svg/powerOff';
import Link from 'next/link';
import menu from './menu';
import {asideHr} from './index.module.css';
import Router from 'next/router';

const logout = () => signOut({redirect: false}).then(_ => Router.push('/login'));

export default function Nav({role, blog}) {
  return <>
    {menu.filter(e => {
      if (!e.admin)
        return true;
      else {
        if (role === 'admin')
          return true;
        else
          return false;
      }
    }).map(e => <Fragment key={e.name}>
        <Option role={role} {...e}/>
        <hr className={asideHr}/>
      </Fragment>
    )}
    <li className={option} onClick={logout}>
      <span>
        <PowerOff fill='#362e6f' height='12' width='32'/>
      </span>
      <span>Cerrar Sesión</span>
    </li>
  </>;
}