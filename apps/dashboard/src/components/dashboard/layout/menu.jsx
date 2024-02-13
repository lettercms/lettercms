import {TiDocumentText} from 'react-icons/ti';
import {ImEarth} from 'react-icons/im';
import {FaChartPie, FaUserCircle, FaCog} from 'react-icons/fa';

const iconColor = '#362e6f';

const menu = [
  {
    name: 'posts',
    title: 'Posts',
    icon: <TiDocumentText fill={iconColor} height='12' width='32'/>,
    href: '/posts',
    /*sub: [
      {
        label: 'Comentarios',
        href: '/posts/comments'
      }
    ]*/
  },/*
  {
    name: 'pages',
    title: 'Paginas',
        href: '/pages',
    icon: <Cross fill={iconColor} height='12' width='32'/>,
  },*/
  {
    name: 'stats',
    title: 'Analytics',
    icon: <FaChartPie fill={iconColor} height='12' width='32'/>,
    href: '/stats'
  },
  {
    name: 'social',
    title: 'Social Media',
    icon: <ImEarth fill={iconColor} height='12' width='32'/>,
    href: '/social'
  },
  {
    name: 'collaborators',
    admin: true,
    title: 'Collaborators',
    icon: <FaUserCircle fill={iconColor} height='12' width='32'/>,
    href: '/collaborators'
  },
  {
    name: 'config',
    title: 'Config',
    icon: <FaCog fill={iconColor} height='12' width='32'/>,
    href: '/config/account',
    sub: [
      {
        label: 'Blog',
        href: '/config/blog',
        admin: true,
      },
      {
        label: 'Usage',
        href: '/config/usage',
        admin: true,
      },
      {
        label: 'Developers',
        admin: true,
        href: '/config/developers'
      }
    ]
  }
];

export default menu;
