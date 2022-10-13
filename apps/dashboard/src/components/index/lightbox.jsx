import Card from './lightboxCard';
import ModalBase from '../modalBase';

const features = [
  {
    title: 'Colaboradores',
    description: 'Los colaboradores ayudan a ahorrar tiempo para cualquier trabajo. Añade a tu equipo, crea y promociona tu contenido de manera rapida y eficiente.',
    features: [
      'Enlace unico de registro',
      'Permisos de acceso',
      'Gestion de colaboradores',
      'Colaboraciones de una entrada',
      'Revocacion del acceso',
      'Gestion de invitaciones'
    ]
  },              
  {
    title: 'Redes sociales',
    description: 'Nuestro servicio de ofrece una manera facil y optima de gestionar tus redes sociales sin salir de la plataforma.',
    features: [
      'Publicacion directa',
      'Programacion de entradas',
      'Auto promocion de nuevas entradas',
      'Visualizacion del timeline',
      'Promocion en Facebook, Twitter e Intagram',
      'Datos de tus redes'
    ]
  },
  {
    title: 'Analiticas',
    description: 'Con nuestro servicio de analiticas te ofrecemos datos completos y detallados de tu blog y lectores.',
    features: [
      'Visualizaciones',
      'Comentarios    ',
      'Taza de rebote',
      'Origenes del trafico',
      'Actividad de tus usuarios',
      'Datos demograficos',
    ]
  }
];

const Lightbox = ({active, close}) => {
  let UI = null;

  if (active == 1)
    UI = <Card {...features[0]} close={close}/>;
  if (active == 2)
    UI = <Card {...features[1]} close={close}/>;
  if (active == 3)
    UI = <Card {...features[2]} close={close}/>;

  return <div>
    <ModalBase show={!!active} close={close}>
      {UI}
    </ModalBase>
  </div>;
};

export default Lightbox;
