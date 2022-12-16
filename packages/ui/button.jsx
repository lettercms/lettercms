import Spinner from '@/components/svg/spinner';
import style from './button.module.css';

export default function Button({loading, className = '', alt, type, children, ...props}) {

  if (loading)
    return <div className={'rotate ' + style.spinner}>
      <Spinner/>
    </div>;

  let _className = `${className} ${style.btn} `;

  if (alt)
    _className += style[`${type}-alt`];
  else
    _className += style[type];

  return <button className={_className} {...props}>{children}</button>;
}
