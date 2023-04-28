import {FaSpinner} from 'react-icons/fa';

const colors = {
  default: '',
  solid: 'bg-main-500',
  outline: 'bg-white',
  'outline-alt': 'bg-white',
  'solid-alt': 'bg-white text-main-500'
};

const text = {
  default: '',
  solid: 'text-white',
  outline: 'bg-none border-white border text-white',
  'outline-alt': 'bg-white border-main-500 border text-main-500 border-solid disabled:bg-main-500 disabled:text-white',
  'solid-alt': 'bg-white'
};

export default function Button({loading, className = '', alt, type, children, ...props}) {

  let backgroundColor = '';
  let textColor = '';

  if (alt) {
    backgroundColor = colors[`${type}-alt`];
    textColor = text[`${type}-alt`];
  }
  else {
    backgroundColor = colors[type];
    textColor = text[type];
  }

  let _className = `${className} inline-block 
    ${backgroundColor}
    ${textColor}
    rounded-full
    pointer
    transition-all
    duration-300
    ease
    px-8
    py-3
    w-max
    text-decoration: none;
  `;


  if (loading)
    return <div className='py-2'>
      <FaSpinner className='animate-spin w-8 h-8 relative m-auto'/>
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