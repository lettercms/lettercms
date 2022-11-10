import {useState, useEffect} from 'react';
import Container from '../../stats/base';
import Modal from '@/components/modalBase';
import Input from '@/components/input';
import List from './keyList';
import {useUser} from '@/components/layout';
import sdk from '@lettercms/sdk';
import ListLoad from './listLoad';
import CopyField from '@/components/copyField';
import Button from '@/components/button';

const ApiKey = () => {
  const [show, toggleModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState([]);
  const [keyName, setKeyName] = useState('');
  const [step, setStep] = useState(0);
  const [newKey, setNewKey] = useState('');
  const {status, blog} = useUser();

  useEffect(() => {
    if (status === 'done') {
      fetch('/api/blog/api-key', {
        headers: {
          Authorization: sdk.accessToken
        }
      })
        .then(e => e.json())
        .then(e => {
          setKeys(e.data);
          setLoading(false);
        });
    }
  }, [status]);

  const create = async () => {
    try {
      if (!keyName)
        return alert('Ingresa una descripción');

      const res = await fetch('/api/blog/api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: sdk.accessToken
        },
        body: JSON.stringify({
          name: keyName
        })
      });

      if (res.ok) {
        const {status, data} = await res.json();

        if (status === 'OK') {
          setNewKey(data.key);
          setStep(1);
          setKeyName('');
          
          data.created = Date.now();

          setKeys(k => [data].concat(k));
          return;
        } else if (status === 'key-limit') {
          setKeyName('');
          toggleModal(false);

          return alert('Solo puede tener 3 llaves por blog');
        }
      }

      alert('Error al crear la llave');
    } catch(err) {
      console.error(err);
      return alert('Error al crear la llave');
    } finally {
      setKeyName('');
    }
  };

  const close = () => {
    toggleModal(false);

    setTimeout(() => {
      setKeyName('');
      setStep(0);
      setNewKey('');
    }, 600);
  };

  const removeKey = id => setKeys(k => k.filter(e => e._id.toString() !== id));

  return <div>
    <Container rows={1} title='Blog ID'>
      <div className='flex flex-column' id='credentials-main' style={{width: '100%'}}>
        <div className='flex flex-row' id='credentials-top'>
          <div>
            <CopyField text={blog?._id}/>
          </div>
          <Button type='solid' onClick={() => toggleModal(true)}>Crear Nueva Llave</Button>
        </div>
        <span>Llaves de la API</span>
        { loading && <ListLoad/> }
        { !loading && <List onDelete={removeKey} apiKeys={keys}/> }
      </div>
    </Container>
    <Modal show={show} close={close} height='max-content' width='max-content'>
      {
        step === 0 &&
        <>
          <div>Añade una breve descripci&oacute;n</div>
          <Input id='keyName' value={keyName} onInput={({target:{value}}) => setKeyName(value)} label='Descripción de la llave'/>
          <Button type='solid' style={{width: '100%'}} onClick={create}>Crear</Button>
        </>
      }
      {
        step === 1 &&
        <>
          <span>Asegurate de Guardala. Por seguridad no la volveremos a mostrar</span>
          <CopyField text={newKey}/>
          <Button type='solid' onClick={close}>Cerrar</Button>
        </>
      }
    </Modal>
    <style jsx>{`
      #credentials-main {
        align-items: start;
        padding: 0 5%;
      }
      #credentials-main span {
        color: #03a9f4;
        margin-top: 1rem;
      }
      #credentials-top {
        justify-content: space-between;
        width: 100%;
      }
      #credentials-top button {
        width: max-content;
      } 
    `}</style>
  </div>;
};

export default ApiKey;
