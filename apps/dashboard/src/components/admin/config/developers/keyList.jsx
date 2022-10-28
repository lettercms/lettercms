import Trash from '@/components/svg/trash';
import sdk from '@lettercms/sdk';


//TODO: add corfination modal to delete
export default function KeyList({apiKeys, onDelete}) {
  const deleteKey = async id => {
    try {
      const res = await fetch('/api/blog/api-key', {
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json', 
          Authorization: sdk.accessToken
        },
        body: JSON.stringify({
          id
        })
      });

      if (res.ok) {
        const {status} = await res.json();

        if (status === 'OK')
          return onDelete(id);
      }

      alert('Error al eliminar la llave');
    } catch(err) {
      return alert('Error al eliminar la llave');
    }
  }
  return <div style={{width: '100%'}}>
    <ul>
      {
        apiKeys?.length === 0 &&
        <li style={{textAlign: 'center'}}>
          <span>No hay llaves disponibles</span>
        </li>
      }
      {
        apiKeys.map(e => {
          const d = new Date(e.created);
          const created = `Creada el ${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} a las ${d.getHours()}:${d.getMinutes()}`;

          return <li key={e._id} className='flex flex-row'>
            <div className='flex flex-column'>
              <span className='key-name'>{e.name}</span>
              <span className='key-date'>{created}</span>
            </div>
            <div>
              <div>
                <Trash onClick={() => deleteKey(e._id)} width='24' height='24'/>
              </div>
            </div>
          </li>
        })
      }
    </ul>
    <style jsx>{`
      ul li {
        list-style: none;
        width: 100%;
        background: #f7f7f7;
        padding: 1rem 2rem;
        margin: .5rem auto;
        border-radius: 10px; 
        border: 1px solid #03a9f444;
      }
      ul li .flex.flex-column {
        align-items: start;
      }
      .key-name {
        font-weight: bold;
      }
      .key-date {
        font-size: .8rem;
      }
      :global(ul li svg) {
        cursor: pointer;
      }
    `}</style>
  </div>
}