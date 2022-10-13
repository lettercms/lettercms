import styles from './input.module.css';

const Input = ({className, id, value, type = 'text', label, ...opts}) => {
  let customClassName = !!value && 'notEmpty';
  const isTextarea = type === 'textarea';
  const isRadio = type === 'radio';
  const isCheckbox = type === 'checkbox';
  const isInput = !isRadio && !isTextarea;

  if (className)
    customClassName = className;

  const options = {
    className: customClassName || undefined,
    type: isInput ? type : null,
    name: id,
    ...opts
  };

  return <div className={styles['form-group']}>
    {
      isInput &&
      <input {...options} value={value}/>
    }
    {
      isTextarea &&
      <textarea {...options} value={value}/>

    }
    <label className={(isCheckbox || isRadio) ? 'option' : undefined} htmlFor={id}>{label}</label>
  </div>;

};

export default Input;

//Email pattern [a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}  