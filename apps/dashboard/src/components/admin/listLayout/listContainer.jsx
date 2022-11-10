import dynamic from 'next/dynamic';
import CardLoad from './cardLoad';
import {container} from './listContainer.module.css';

const Card = dynamic(() => import('./card'), {
  loading: CardLoad,
  ssr: false,
});

const Collabs = dynamic(() => import('./collabCard'), {
  loading: CardLoad,
  ssr: false,
});

export default function ListContainer({type, data, before, cursor, onDelete, onEdit, setBefore, isLoadingMore, setData}) {
  return <>
    <ul className={container}>
      {
        data.map((e) => {
          switch(type) {
            case 'accounts':
              return <Collabs key={e._id} {...e}/>
            default:
              return <Card key={e.url + e._id} edit={onEdit} del={id => onDelete(id, setData)} {...e}/>
          }
        })
      }
    </ul>
    {
      before &&
      <Button style={{margin: 'auto'}} type='outline' onClick={() => setBefore(before)} loading={isLoadingMore}>Cargar Más</Button>
    }
  </>;
}