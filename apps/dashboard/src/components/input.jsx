const Input = ({className, id, status, value = '', type = 'text', label, ...opts}) => {
  let customClassName = !!value && 'notEmpty';
  const isTextarea = type === 'textarea';
  const isRadio = type === 'radio';
  const isCheckbox = type === 'checkbox';
  const isInput = !isRadio && !isTextarea;

  if (className)
    customClassName = className;

  if (status === 'invalid')
    className += ' button-invalid';
  else if (status === 'valid')
    className += ' button-valid';

  const options = {
    className: customClassName || undefined,
    type: isInput ? type : null,
    name: id,
    ...opts
  };

  return <div className='form-group'>
    {
      isInput &&
      <input {...options} value={value}/>
    }
    {
      isTextarea &&
      <textarea {...options} value={value}/>

    }
    <label className={(isCheckbox || isRadio) ? 'option' : undefined} htmlFor={id}>{label}</label>
    <style jsx>{`
      input:disabled,
      textarea:disabled {
        background-color: #f5f5f5 !important;
      }
      .button-invalid {
        border-color: red !important;
      }
      .button-valid {
        border-color: green !important;
      }
    `}</style>
  </div>;

};

export default Input;
