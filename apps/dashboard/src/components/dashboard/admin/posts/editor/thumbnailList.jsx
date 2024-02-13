import {FormattedMessage} from 'react-intl';
import {metaInputs} from './metaInputs.module.css';
import {useData} from './index';

export default function List() {
  const [data, setData] = useData();

  return <div className={metaInputs + ' thumbContainer'}>
    <span>
      <FormattedMessage id='Select a thumbnail'/>
    </span>
    <ul>
      {
        data.images?.length > 0
        && data.images.map(e => <li
          key={e}
          className={e === data.thumbnail ? 'actual':''}
          onClick={e === data.thumbnail ? null : () => setData('thumbnail', e)}
          >
            <img alt={e} src={e + '&w=200&q=50'}/>
          </li>
        )
      }
      {
        data.images?.length === 0 &&
        <span>
          <FormattedMessage id='There are no images on this post'/>
        </span>
      }
      <style jsx global>{`
        .thumbContainer {
          width: 15rem !important;
          padding: .5rem 0 .5rem 1rem;
          max-height: 35rem;
        }
        .thumbContainer span {
          text-align: center;
          width: 100%;
          margin: 0 0 .5rem;
          display: block;
        }
        .thumbContainer ul {
          overflow-y: auto;
          padding-right: 1rem;
        }
        .thumbContainer li {
          padding: 15px 5%;
          cursor: pointer;
          border-radius: 5px;
          transition: ease .3s;
          list-style: none;
        }
        .thumbContainer li.actual {
          cursor: default;
          background: #ccc;
        }
        .thumbContainer li:hover {
          background: #ccc;
        }
        .thumbContainer li img {
          width: 100%;
        }
      `}</style>
    </ul>
  </div>;
};
