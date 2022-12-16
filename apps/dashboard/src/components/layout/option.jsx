import Link from 'next/link';
import {useRef, useEffect, useState, Fragment} from 'react';
import {option, subTab, subHeader, subHr} from './option.module.css';

export default function Option({role, title, sub, icon, href}) {

  const tabRef = useRef(null);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (focus) {
      tabRef.current.style.display='block';

      setTimeout(() => {
        tabRef.current.style.opacity = 1;
      }, 0);

    } else {
      tabRef.current.style.opacity = 0;

      setTimeout(() => {
        tabRef.current.style.display='none';
      }, 300);
    }
  }, [focus]);

  return <li style={{position: 'relative'}}>
    <button className={option} onClick={() => setFocus(!focus)} onBlur={() => setFocus(false)}>
      <span>{icon}</span>
      <span>{title}</span>
    </button>
    <ul className={subTab} ref={tabRef}>
      <Link href={href}>
        <a>
          <li className={subHeader}>{title}</li>
        </a>
      </Link>
      <hr/>
      {
        sub?.filter(e => {
          if (!e.admin)
            return true;
          else {
            if (role === 'admin')
              return true;
            else
              return false;
          }
        }).map((e, i) => <Fragment key={e.href + e.label}>
          {i !== 0 && <hr  className={subHr}/>}
          <Link href={e.href}>
            <a onClick={() => setFocus(false)}>
              <li>{e.label}</li>
            </a>
          </Link>
        </Fragment>)
      }
    </ul>
  </li>;
}
