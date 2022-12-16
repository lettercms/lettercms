import Copy from '@/components/svg/copy';

export default function CopyField({text}) {
  const copy = () => {
    navigator.clipboard.writeText(text);
    alert('Copiada');
  };

  return <div className='copy-field flex flex-row'>
    <span>{text}</span>
    <Copy height='24' onClick={copy}/>
    <style jsx>{`
      .copy-field {
        width: max-content;
        padding: .7rem .5rem .7rem 1rem;
        margin: .5rem auto;
        border-radius: 10px; 
        border: 1px solid #03a9f444;
      }
      :global(.copy-field svg) {
        margin-left: 1rem;
        cursor: pointer;
      }
    `}</style>
  </div>;  
}