import Cross from '@/components/svg/cross';
import Website from '@/components/svg/website';
import Chart from '@/components/svg/charPie';
import User from '@/components/svg/userCircle';
import Cog from '@/components/svg/cog';

const menu = [
  {
    name: 'posts',
    title: 'Entradas',
    icon: <Cross fill='#362e6f' height='12' width='32'/>,
    href: '/dashboard/posts',
    sub: [
      {
        label: 'Comentarios',
        href: '/dashboard/posts/comments'
      }
    ]
  },
  {
    name: 'pages',
    title: 'Paginas',
        href: '/dashboard/pages',
    icon: <Cross fill='#362e6f' height='12' width='32'/>,
  },
  {
    name: 'stats',
    title: 'Analiticas',
    icon: <Chart fill='#362e6f' height='12' width='32'/>,
    href: '/dashboard/stats'
  },
  {
    name: 'social',
    title: 'Redes Sociales',
    icon: <Website fill='#362e6f' height='12' width='32'/>,
    href: '/dashboard/social'
  },
  {
    name: 'collaborators',
    admin: true,
    title: 'Colaboradores',
    icon: <User fill='#362e6f' height='12' width='32'/>,
    href: '/dashboard/collaborators'
  },
  {
    name: 'config',
    title: 'Configuración',
    icon: <Cog fill='#362e6f' height='12' width='32'/>,
    href: '/dashboard/config/account',
    sub: [
      {
        label: 'Blog',
        href: '/dashboard/config/blog',
        admin: true,
      },
      {
        label: 'Uso',
        href: '/dashboard/config/usage',
        admin: true,
      },
      {
        label: 'Desarrolladores',
        admin: true,
        href: '/dashboard/config/developers'
      }
    ]
  }
];

export default menu;
