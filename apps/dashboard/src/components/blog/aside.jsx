import Base from '@/components/admin/stats/base';
import Input from '@/components/input';

export default function Aside({owner}) {
  return <aside>
    <Base row={1} principal>
      <div id='query-container'>
        <Input label='Termino' id='query'/>
        <button className='btn-outline-sm alter'>Buscar</button>
      </div>
    </Base>
    <Base row={1}>
      <div id='user-container'>
        <div>
          <img src={owner.photo}/>
        </div>
        <div>
          <span>{owner.name} {owner.lastname}</span>
          <p>{owner.description}</p>
        </div>
      </div>
    </Base>
    <style jsx>{`
      aside {
        display: none;
      }
      @media screen and (min-width: 1024px) {
        aside {
          display: block;
          width: 30%;
          margin-top: 35px;
        }
        #query-container {
          display: flex;
          flex-direction: column;
        }
      }
    `}</style>
  </aside>;
}
