import {useEffect, useState} from 'react';
import Card from '../posts/card';
import Top from '../top';
import CardLoad from '../cardLoad';
import sdk from '@lettercms/sdk';
import NoData from './noData';
import {useUser} from '@/lib/dashboardContext';
import Button from '@/components/button';

let actual = {};
let cursor = '';

const fetchData = async ({type, fields, pageToken, status,  setData, setBefore, setLoading, setLoadMore, setCount, setStatus}) => {
      
  if (!pageToken) {
    setData([]);
    setLoading(true);
  } else
    setLoadMore(true);

  const opts = {
    fields,
    limit: 10
  };

  if (pageToken)
    opts.before = pageToken;

  if (type === 'accounts')
    opts.role = 'collaborator';

  if (type === 'pages' || type === 'posts')
    opts.sort = 'created';

  if (status && status !== '*')
    opts.status = status;

  sdk[type].all(opts)
    .then(({ total, data, paging: {cursors: {before}} }) => {
      setData(prev => prev.concat(data));
      setLoading(false);
      setLoadMore(false);
      setCount(total);
      cursor = before;
    });
};

  const _delete = async (id, cb) => {
    try {
      if (!confirm('¿Esta seguro de eliminar?'))
        return;

      const { status, message } = await sdk[props.type].delete(id);

      if (status === 'OK') {
        alert('Eliminado con Exito');
        cb(prev => prev.filter(({_id}) => _id !== id));
      } else
        alert(message);
    } catch (err) {
      alert('Error al Eliminar entrada');
      throw err;
    }
  };


function Layout(props) {
  const user = useUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [before, setBefore] = useState(null);
  const [isLoadingMore, setLoadMore] = useState(false);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('*');

  const fetchOpts = {
    type: props.type,
    fields: props.fields,
    pageToken: before,
    status,
    setData,
    setBefore,
    setLoading,
    setLoadMore,
    setCount,
    setStatus
  }

  useEffect(() => {
    if (user.status === 'done' && (actual.pageToken !== fetchOpts.pageToken || actual.status !== fetchOpts.status)) {

      fetchData(fetchOpts);

      actual = {
        pageToken: fetchOpts.pageToken,
        status: fetchOpts.status
      }
    }

  }, [fetchOpts, user.status]);

  let ui;

  if (loading) {
    ui = <CardLoad/>;
  }
  else if (data.length > 0) {
    ui = <>
      <ul>
        {data.map((e) => <Card key={e.url + e._id} edit={props.onEdit} del={id => _delete(id, setData)} {...e}/>)}
      </ul>
      {
        cursor &&
        <Button style={{margin: 'auto'}} type='outline' onClick={() => setBefore(cursor)} loading={isLoadingMore}>Cargar Más</Button>
      }
    </>;
  } else {
    ui = <NoData action={props.onCreate} picture={props.picture} buttonText={props.buttonText}/>;
  }

  return <>
    <Top
      active={status}
      data={data}
      loading={!count}
      countTabs={props.tabs}
      create={props.onCreate}
      onFilter={status => {
        setData([]);
        setLoading(true);
        setStatus(status)
      }}
      count={count}
      buttonText={props.buttonText}
    />
    {ui}
  </>;
}

export default Layout;
