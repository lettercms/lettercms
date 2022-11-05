import {useState} from 'react';
import Modal from '@/components/modalBase';
import Input from '@/components/input';
import Button from '@/components/button';

  const DeleteBlog = () => {
    const [show, toggleModal] = useState(false);
    const [password, setPaswword] = useState('');

    return <div>
      <div>
        <Button type='solid' style={{width: '100%'}} onClick={() => toggleModal(true)}>Eliminar</Button>
      </div>
      <Modal show={show} close={() => toggleModal(false)} height='max-content' width='max-content'>
        <div>¿Estas seguro que deseas eliminar tu blog y tus datos asociados a el? Esta accion es irreversible</div>
        <hr/>
        <div>Para confirmar esta accion coloca tu contraseña</div>
        <Input id='password' value={password} onInput={({target:{value}}) => setPaswword(value)} label='Contraseña'/>
        <Button type='solid'>Eliminar</Button>
      </Modal>
      <style>{`
        ul#modal {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
        }
        ul#modal li {
          margin: 0 15px;
        }
        ul#modal li img {
          width: 75px;
          cursor: pointer;
        }
      `}</style>
    </div>;
  };

export default DeleteBlog;
