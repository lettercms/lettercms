import {useEffect, useState} from 'react';
import Card from '../posts/card';
import Top from '../top';
import CardLoad from '../cardLoad';
import sdk from '@lettercms/sdk';
import LoadMore from './loadMore';
import NoData from './noData';
import {useUser} from '@/lib/dashboardContext';

function Layout(props) {
  const user = useUser();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [before, setBefore] = useState(null);
  const [isLoadingMore, setLoadMore] = useState(false);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('*');

  const fetchData = async (pageToken, _status) => {
    const {
      fields,
      type
    } = props;
    
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

    if (_status && _status !== '*')
      opts.status = _status;

    sdk[type].all(opts)
      .then(({ total, data: fetchedData, paging: {cursors: {before: b}} }) => {
        setData(data.concat(fetchedData));
        setBefore(b);
        setLoading(false);
        setLoadMore(false);
        setCount(total);
        setStatus(_status || '*');
      });
  };

  const _delete = async id => {
    const {
      type
    } = props;

    try {
      if (!confirm('¿Esta seguro de eliminar?'))
        return;

      const { status, message } = await sdk[type].delete(id);

      if (status === 'OK') {
        alert('Eliminado con Exito');
        fetchData();
      } else
        alert(message);
    } catch (err) {
      alert('Error al Eliminar entrada');
      throw err;
    }
  };

  useEffect(() => {
    if (user.status === 'done')
      fetchData();
  }, [user.status, fetchData]);

  let ui;

  if (loading) {
    ui = <CardLoad/>;
  }
  else if (data.length > 0) {
    ui = <>
      <ul>
        {data.map((e) => <Card key={e.url + e._id} edit={props.onEdit} del={_delete} {...e}/>)}
      </ul>
      {
        before &&
        <LoadMore onClick={() => fetchData(before, status)} isLoading={isLoadingMore}/>
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
      onFilter={status => fetchData(null, status)}
      count={count}
      buttonText={props.buttonText}
    />
    {ui}
  </>;
}

export default Layout;
