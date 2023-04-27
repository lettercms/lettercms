import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import Top from './top';
import ListContainer from './listContainer';
import sdk from '@lettercms/sdk';
import NoData from './noData';
import {useUser} from '@/components/dashboard/layout';
import {layoutContainer} from './index.module.css';
import CardLoad from './cardLoad';
import Filter from './filters';

let cursor = '';

const fetchInit = async ({type, fields, status}) => {
  const opts = {
    fields,
    limit: 10
  };

  if (type === 'accounts')
    opts.role = 'collaborator';

  if (type === 'pages' || type === 'posts')
    opts.sort = 'created';

  if (status && status !== '*')
    opts.status = status;

  return sdk[type].all(opts);
};

const fetchMore = async ({type, fields, pageToken, status,  setData, setLoadMore, setCount}) => {
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
      setLoadMore(false);
      setCount(total);
      cursor = before;
    });
};

const _delete = async (id, type, cb, intl) => {
  try {
    const sureDelete = confirm(
      intl.formatMessage({
        id: 'Are you sure to delete it?'
      })
    );

    if (!sureDelete)
      return;

    const { status, message } = await sdk[type].delete(id);

    if (status === 'OK') {
      alert(
        intl.formatMessage({
          id: 'Deleted successfully'
        })
      );
      cb(prev => prev.filter(({_id}) => _id !== id));
    } else
      alert(message);
  } catch (err) {
    alert(
      intl.formatMessage({
        id: 'Error on delete'
      })
    );
    throw err;
  }
};

function Layout(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setLoadMore] = useState(false);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('*');

  const user = useUser();
  const intl = useIntl();

  useEffect(() => {
    if (user.status === 'done' && props.fields && props.type)
      fetchInit({
        type: props.type,
        fields: props.fields,
        status: props.status
      })
        .then(({ total, data, paging: {cursors: {before}} }) => {
          setData(data);
          setLoading(false);
          setCount(total);
          cursor = before;
        });
  }, [user.status, props.type, props.fields, props.status]);

  let ui;

  if (loading) {
    ui = <ul style={{margin: '0 2.5%'}}>
      <CardLoad/>
    </ul>;
  }
  else if (data.length > 0) {
    ui = <ListContainer
      type={props.type}
      data={data}
      before={cursor}
      onLoadMore={() => {
        fetchMore({
          type: props.type,
          fields: props.fields,
          pageToken: cursor,
          status,
          setData,
          setLoadMore,
          setCount
        });
      }}
      onDelete={(id, type, cb) => _delete(id, type, cb, intl)}
      setData={setData}
      onEdit={props.onEdit}
      isLoadingMore={isLoadingMore}
    />;
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
      disableTopButton={props.disableTopButton}
    >
      <Filter
        active={status}
        data={data}
        loading={!count}
        countTabs={props.tabs}
        create={props.onCreate}
        onFilter={_status => {
          setLoading(true);
          setStatus(_status);

          fetchInit({
            type: props.type,
            fields: props.fields,
            status: _status
          })
            .then(({ total, data, paging: {cursors: {before}} }) => {
              setData(data);
              setLoading(false);
              setCount(total);

              cursor = before;
            });
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
