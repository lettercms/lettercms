import Cross from '@lettercms/icons/cross';
import Website from '@lettercms/icons/website';
import Chart from '@lettercms/icons/charPie';
import User from '@lettercms/icons/userCircle';
import Cog from '@lettercms/icons/cog';

const iconColor = '#362e6f';

const menu = [
  {
    name: 'posts',
    title: 'Posts',
    icon: <Cross fill={iconColor} height='12' width='32'/>,
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
    icon: <Chart fill={iconColor} height='12' width='32'/>,
    href: '/stats'
  },
  {
    name: 'social',
    title: 'Social Media',
    icon: <Website fill={iconColor} height='12' width='32'/>,
    href: '/social'
  },
  {
    name: 'collaborators',
    admin: true,
    title: 'Collaborators',
    icon: <User fill={iconColor} height='12' width='32'/>,
    href: '/collaborators'
  },
  {
    name: 'config',
    title: 'Config',
    icon: <Cog fill={iconColor} height='12' width='32'/>,
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
