import Spinner from '@/components/svg/spinner';
import style from './button.module.css';

export default function Button({loading, className = '', alt, type, children, ...props}) {

  let _className = `${className} ${style.btn} `;

  if (alt)
    _className += style[`${type}-alt`];
  else
    _className += style[type];

  if (loading)
    return <div className={'rotate ' + style.spinner}>
      <Spinner/>
    </div>;

  return <button className={_className} {...props}>{children}</button>;
}
      /*<Image layout='fill'
        src={`${process.env.ASSETS_BASE}/assets/spinner-black.svg`}
        alt='Spinner'
        style={{
          display: 'block', height: '2.75rem', margin: '15px auto', animation: 'rotation linear 1s infinite',
        }}
      />*/