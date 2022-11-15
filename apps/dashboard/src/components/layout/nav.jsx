import {Fragment} from 'react';
import {option} from './option.module.css';
import Option from './option';
import Home from '@/components/svg/home';
import PowerOff from '@/components/svg/powerOff';
import Link from 'next/link';
import menu from './menu';
import {
  asideHr
} from './index.module.css';
import Router from 'next/router';

const logout = () => signOut({redirect: false}).then(_ => Router.push('/login'));

export default function Nav({role, blog}) {
  return <>
    <li className={option}>
      <Link href={`https://${blog?.domain}${blog?.mainUrl}`}>
        <a target='_blank'>
          <span>
            <Home fill='#362e6f' height='12' width='32'/>
          </span>
          <span>Inicio</span>
        </a>
      </Link>
    </li>
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
        <hr className={asideHr}/>
        <Option role={role} {...e}/>
      </Fragment>
    )}
    <hr className={asideHr}/>
    <li className={option} onClick={logout}>
      <span>
        <PowerOff fill='#362e6f' height='12' width='32'/>
      </span>
      <span>Cerrar Sesión</span>
    </li>
  </>;
}