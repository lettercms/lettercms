import {useState} from 'react';
import Modal from '../../../modalBase';
import importData from '@/lib/uploadXml';
import {useUser} from '@/lib/dashboardContext';

export default function BlogImport() {
  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);

  const {blog} = useUser();

  const sendBlogData = cms => {
    if (sending)
      return;

    let input = document.getElementById('input-data');

    if (input === null) {
      input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'application/xml');
      input.id = 'input-data';

      input.onchange = async ({ target }) => {
        const { files } = target;
        const file = files[0];
        setSending(true);

        try {
          const {status} = await importData(file, cms, blog.subdomain);
          if (status === 'OK') {
            alert('Datos importado con exito');
            setShowModal(false);
          }

        } catch(err) {
          alert('Error al importar las entradas');
          throw err;
        } finally {
          setSending(false);
        }
      };
    }

    input.click();
  }

  return <div>
    <div>
      <button className="black" onClick={() => setShowModal(true)}>Importar</button>
      {/*<button className="black">Exportar</button>*/}
    </div>
    <Modal show={showModal} close={() => setShowModal(false)} height='max-content' width='max-content'>
      <ul id="modal">
        <li>
          <img alt='blogger logo' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/blogger.png' onClick={() => sendBlogData('blogger')}/>
        </li>
        {/*
        <li>
          <img alt='wordpress logo' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/wordpress.png' onClick={() => this.sendBlogData('wordpress')}/>
        </li>
        <li>
          <img alt='davidsdevel logo' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/davidsdevel-rombo.png' onClick={() => this.sendBlogData('this')}/>
        </li>*/}
      </ul>
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
}
