import {useIntl} from 'react-intl';
import Button from '@/components/button';
import {top, focus} from './filters.module.css'; 

export default function Top(props) {
  const {active, countTabs, data, create, loading, count, buttonText, disabled, buttonRef} = props;

  const intl = useIntl();

  let counts;

  if (loading)
    counts = <span style={{width: 70}}/>;
  else if (data && countTabs && !loading) {
    counts = <>
      <Button
        className={active === '*' ? focus : ''}
        type='outline'
        alt
        disabled={!count.all || active === '*'}
        onClick={() => props.onFilter('*') }
      >
        {`${intl.formatMessage({id: 'All'})} (${count.all})`}
      </Button>
      {
        countTabs.map(e => {
          let tabCount = count[e.name];

          return <Button
            className={active === e.name ? focus : ''}
            key={e.name}
            type='outline'
            alt
            disabled={!tabCount}
            onClick={() => active === e.name ? null : props.onFilter(e.name) }
          >
            {`${e.alias} (${tabCount || 0})`}
          </Button>;
        })
      }
    </>;
  }

  return <div className={top}>
    <Button type='solid' ref={buttonRef} onClick={create} disabled={loading || disabled}>{buttonText || 'Create'}</Button>
    <div>
      {counts}
    </div>
  </div>;
}