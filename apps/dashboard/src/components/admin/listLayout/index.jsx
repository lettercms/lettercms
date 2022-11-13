import {useEffect, useState, useMemo} from 'react';
import {useRouter} from 'next/router';
import Top from './top';
import ListContainer from './listContainer';
import sdk from '@lettercms/sdk';
import NoData from './noData';
import {useUser} from '@/components/layout';
import Button from '@/components/button';
import {layoutContainer} from './index.module.css';
import CardLoad from './cardLoad';
import Filter from './filters';

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

  const _delete = async (id, type, cb) => {
    try {
      if (!confirm('¿Esta seguro de eliminar?'))
        return;

      const { status, message } = await sdk[type].delete(id);

      if (status === 'OK') {
        alert('Eliminado con Exito');
        cb(prev => prev.filters(({_id}) => _id !== id));
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

  const router = useRouter();

  const fetchOpts = useMemo(() => ({
    type: props.type,
    fields: props.fields,
    pageToken: cursor,
    status,
    setData,
    setBefore,
    setLoading,
    setLoadMore,
    setCount,
    setStatus
  }), [props.type, props.fields, before, status]);

  useEffect(() => {
    if (
      user.status === 'done' && 
      !router.pathname.includes('/edit/') &&
      (
        actual.pageToken !== fetchOpts.pageToken ||
        actual.status !== fetchOpts.status ||
        router.pathname !== actual.pathname
      )
    ) {

      fetchData(fetchOpts);

      actual = {
        pageToken: fetchOpts.pageToken,
        status: fetchOpts.status,
        pathname: router.pathname
      };
    }

  }, [fetchOpts, user.status, router.pathname]);

  let ui;

  if (loading) {
    ui = <ul style={{margin: '0 2.5%'}}>
      <CardLoad/>
    </ul>;
  }
  else if (data.length > 0) {
    ui = <ListContainer type={props.type} data={data} before={cursor} setBefore={setBefore} onDelete={_delete} onEdit={props.onEdit} isLoadingMore={isLoadingMore}/>;
  } else {
    ui = <NoData action={props.onCreate} picture={props.picture} buttonText={props.buttonText}/>;
  }

  return <div className={layoutContainer}>
    <Top
      loading={!count}
      create={props.onCreate}
      buttonText={props.buttonText}
      topImg={props.topImg}
      topText={props.topText}
      ico={props.ico}
    >
      <Filter
        active={status}
        data={data}
        loading={!count}
        countTabs={props.tabs}
        create={props.onCreate}
        onFilter={status => {
          setData([]);
          setLoading(true);
          setStatus(status);
        }}
        count={count}
        buttonText={props.buttonText}
        topImg={props.topImg}
        topText={props.topText}
      />
    </Top>
    {ui}
  </div>;
}

export default Layout;
