import {useState, useEffect} from 'react';
import Categories from './blogCategories';
import Container from '../stats/base';
import BlogTitle from './blog/title';
import BlogCategory from './blog/categories';
import BlogUrl from './blog/url';
import BlogImport from './blog/import';
import BlogDelete from './blog/delete';
import Thumbnail from './blog/thumbnail';
import sdk from '@lettercms/sdk';
import {useUser} from '@/lib/dashboardContext';
import BaseLoad from '../stats/baseLoad';

let changes = {};

const handleChanges = (e, cb) => {
  const {target: {name, type}} = e;

  const value = type === 'checkbox' ? e.target.checked : e.target.value;

  cb(value);
  changes[name] = value;
};

export default function BlogConfig({button}) {
  const [thumbnail, setThumbnail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [urlID, setUrl] = useState('');

  const [load, setLoad] = useState(true);
  const {status} = useUser();

  useEffect(() => {
    if (status === 'done') {
      sdk.blogs.single([
        'thumbnail',
        'title',
        'description',
        'isVisible',
        'categories',
        'url'
      ])
      .then(data => {
        setThumbnail(data.thumbnail);
        setTitle(data.title);
        setDescription(data.description);
        setIsVisible(data.isVisible);
        setCategories(data.categories || []);
        setUrl(data.url);
        setLoad(false);
      });
      
      if (button.current) {
        button.current.onclick = () => sdk.blogs.update(changes).then(() => {
          alert('Datos Modificados con exito');
          changes = {};
        });
      }
    }
  }, [status, button]);


  const addCategory = cat => {
    if (!changes.categories)
      changes.categories = [cat];
    else
      changes.categories.push(cat);

    setCategories(arr => [...arr, cat]);
  };

  const deleteCategory = cat => {
    changes.categories = changes.categories.filter(e => e !== cat);

    if (changes.categories.length === 0 && urlID == '2') {
      setUrl('1');
      changes.url = '1';
    }

    setCategories(arr => arr.filter(e => e !== cat));
  };

  if (load)
    return <BaseLoad rows={1}/>;

  return <>
      <div className='config-opts'>
        <Thumbnail url={thumbnail}/>
        <Container rows={1} title='Meta' style={{height: 'auto !important'}}>
          <BlogTitle
            isVisible={isVisible}
            title={title}
            description={description}
            onChangeTitle={e => handleChanges(e, setTitle)}
            onChangeDescription={e => handleChanges(e, setDescription)}
            onChangeVisible={e => handleChanges(e, setIsVisible)}
          />
        </Container>
        <Container rows={1} title='Categorias' style={{height: 'auto !important'}}>
          <BlogCategory categories={categories} onAdd={addCategory} onDelete={deleteCategory}/>
        </Container>
        <Container rows={1} title='Ruta de las entradas' style={{height: 'auto !important'}}>
          <BlogUrl urlID={urlID} categories={categories} onChange={e => handleChanges(e, setUrl)}/>
        </Container>
        <Container rows={2} title='Datos' style={{height: 'auto !important'}}>
          <BlogImport/>
        </Container>
        <Container rows={2} title='Eliminar Blog' style={{height: 'auto !important'}}>
          <BlogDelete/>
        </Container>
      </div>
      <style jsx>{`
        :global(.chart-container > div) {
          width: 70%
        }
        hr {
          width: 100%;
        }
        button {
          max-width: 200px;
        }
        button:disabled {
          background: white;
        }
      `}</style>
    </>;
}
