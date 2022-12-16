import {Fragment} from 'react';
import Link from 'next/link';

const paths = [
  {
    name: 'blog',
    alias: 'Blog'
  },
  {
    name: 'account',
    alias: 'Cuenta'
  },
/*  {

    name: 'payment',
    alias: 'Pago'
  },*/
  {

    name: 'usage',
    alias: 'Uso'
  },
  {
    name: 'developers',
    alias: 'Desarroladores'
  }
];

const ConfigAside = ({onChange, active}) => <div id='config-aside'>
  <ul>
  {
    paths.map(({name, alias}, i) => {
      const isActive = name === active;

      return <Fragment key={name}>
        {i > 0 && <hr/>}
        <Link href={`/dashboard/config/${name}`}>
          <a>
            <li className={isActive ? 'active' : null}>
            {alias}
            </li>
          </a>
        </Link>
      </Fragment>;
    })
  }
  </ul>
  <style jsx>{`
    #config-aside {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #config-aside ul {
      list-style:none;
      border: solid 1px #a1a1a1;
      padding: 1rem;
      border-radius: 10px;
      background: white;
    }
    #config-aside ul li {
      transition: ease .3s;
      padding: .75rem 4rem;
      border-radius: 50px;
      text-align: center;
    }
    #config-aside ul li:hover {
      background: #1282a255;
      cursor: pointer;
    }
    #config-aside ul li.active {
      background: #1282a2;
      color: white;
      cursor: default;
    }
  `}</style>
</div>;

export default ConfigAside;
