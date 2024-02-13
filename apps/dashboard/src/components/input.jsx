'use client';

import {useState} from 'react';

const Input = ({className, id, status, value = '', type = 'text', label, ...opts}) => {
  const [isFocused, setIsFocused] = useState(false);

  const isTextarea = type === 'textarea';
  const isRadio = type === 'radio';
  //const isCheckbox = type === 'checkbox';
  const isInput = !isRadio && !isTextarea;
  const isEmpty = !value;

  let customClassName = `pt-5 border w-full rounded-md pb-2 pl-4 focus:outline-none focus:border focus:border-main-300 ${isEmpty  ? '' : ''} `;

  if (className)
    customClassName += className;

  if (status === 'invalid')
    customClassName += ' border-red-500';
  else if (status === 'valid')
    customClassName += ' border-green-500';

  const options = {
    className: customClassName || undefined,
    type: isInput ? type : null,
    name: id,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    ...opts 
  };

  return <div className='relative w-full m-auto'>
    {
      isInput &&
      <input {...options} value={value}/>
    }
    {
      isTextarea &&
      <textarea {...options} value={value}/>

    }
    <label className={`
      transition-all
      duration-150
      ease
      absolute
      left-3
      px-1
      ${isFocused ?  'top-0 text-main-100 text-sm' : ''}
      ${!isFocused && !isEmpty ? 'top-0 text-gray-200 text-sm': ''}
      ${!isFocused && isEmpty ? 'top-4': ''}
    `
    } htmlFor={id}>{label}</label>
  </div>;

};

export default Input;
