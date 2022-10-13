import Input from '../../input';
import {useState} from 'react';

const filterUrl = value => value.toLowerCase()
  .split(' ')
  .slice(0, 8)
  .join('-')
  .replace(/ñ/g, 'n')
  .replace(/á|à|â|ä/g, 'a')
  .replace(/é|è|ê|ë/g, 'e')
  .replace(/í|ì|î|ï/g, 'i')
  .replace(/ó|ò|ô|ö/g, 'o')
  .replace(/ú|ù|ü|û/g, 'u')
  .replace(/ñ/g, 'n')
  .replace(/"|'/g, '');



const InputPanel = ({title,url, description, onChange, pageStatus}) => {
  const isPublished = pageStatus === 'published';

  const [_title, setTitle] = useState(title || '');
  const [_description, setDescription] = useState(description || '');
  const [_url, setUrl] = useState(url || '');

  const handleInput = e => {
    const {name, value} = e.target;
    let _url = null;

    if (name === 'title')
      setTitle(value);
    if (name === 'description')
      setDescription(value);
    if ((name === 'url' || name === 'title') && !isPublished) {
      _url = filterUrl(value);
      setUrl(_url);
    }

    onChange(e, _url);
  };

  console.log(_title, _url, _description);
  return <div id='custom-panel-react'>
    <div>
      
    </div>
    <hr/>
    <Input id='title' value={_title} label='Titulo' onInput={handleInput}/>
    <Input id='description' value={_description} label='Descripcion' type='textarea' onInput={handleInput}/>
    <Input id='url' value={_url} label='Enlace' disabled={pageStatus === 'published'} onInput={handleInput}/>
    <style jsx>{`
      #custom-panel-react {
        padding: 1rem .25rem;
      }
    `}</style>
  </div>;
};

export default InputPanel;
