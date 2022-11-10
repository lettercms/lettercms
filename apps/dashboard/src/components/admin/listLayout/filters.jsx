import Button from '@/components/button';
import {top, focus, selector} from './filters.module.css'; 

export default function Top(props) {
  const {active, countTabs, data, create, loading, count, buttonText, onChangeTab, tabs, disabled, buttonRef} = props;


    let counts;

    if (loading)
      counts = <span style={{width: 70}}/>;
    else if (data && countTabs && !loading) {

      const totalTabs = count.all;
      const totalIsActive = count.all > 0;

      counts = <>
        <Button
          className={active === '*' ? focus : ''}
          type='outline'
          disabled={!count.all}
          onClick={() => props.onFilter('*') }
          >
          {`Todos (${count.all})`}
        </Button>
        {
          countTabs.map(e => {
            let tabCount = count[e.name];
            let isActive = tabCount > 0;

            return <Button
              className={active === e.name ? focus : ''}
              key={e.name}
              type='outline'
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
      <Button type='outline' disabled={loading} ref={buttonRef} onClick={create} disabled={loading || disabled}>{buttonText || 'Create'}</Button>
      <div>
        {counts}
      </div>
    </div>;
  }