import Tabs from './tabs';
import Button from '@/components/button';

export default function Top(props) {
    const {active, countTabs, data, create, loading, count, buttonText,onChangeTab, tabs, disabled, buttonRef} = props;

    let counts;

    if (loading)
      counts = <span style={{width: 70}}/>;
    else if (data && countTabs && !loading) {

      const totalTabs = count.all;
      const totalIsActive = count.all > 0;

      counts = <>
        <Button
          className={`selector-button${active === '*' ? ' button-focus' : ''}`} 
          style={{
            maxWidth: 'fit-content'
          }}
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
              className={`selector-button${active === e.name ? ' button-focus' : ''}`}
              key={e.name}
              style={{
                maxWidth: 'fit-content',
                margin: '0 5px',
              }}
              disabled={!tabCount}
              onClick={() => active === e.name ? null : props.onFilter(e.name) }
            >
              <span>{e.alias}</span>
              <span>{` (${tabCount || 0})`}</span>
            </Button>;
          })
        }
      </>;
    }

    return <div className='top-static'>
      <div className='top-fixed'>
        <div className="top">
          <Button type='outline' disabled={loading} style={{width: 'max-content'}} alt ref={buttonRef} onClick={create} disabled={loading || disabled}>{buttonText || 'Create'}</Button>
          <div>
            {counts}
          </div>
        </div>
        {
          tabs && 
          <Tabs tabs={tabs} onChange={onChangeTab}/>
        }
      </div>
      <style jsx global>{`
        .selector-button {
          border: #fff 1px solid;
          background-color: #fff;
          color: #1282a2;
        }
        .selector-button:enabled:hover,
        .button-focus{
          border-color: #f3f7fd;
          background-color: transparent;
          color: #fff !important;
        }
        .button-focus {
          cursor: default !important;
        }
        @keyframes loading {
           0% {
             opacity: 1;
           }
           50% {
             opacity: .5;
           }
           100% {
             opacity: 1;
           }
        }
      `}</style>
      <style jsx>{`
        .top-static {
          height: ${!!tabs ? 119 : 90}px;
        }
        .top-fixed {
          z-index: 1;
          width: calc(100% - 60px);
          left: 60px;
          position: fixed;
        }
        .top {
          display: flex;
          background: #5f4dee;
          color: white;
          align-items: center;
          justify-content: space-between;
          padding: 15px 5%;
        }
        .top div {
          display: flex;
          justify-content: flex-end;
          flex-grow: 1;
        }
        :global(.top div > span) {
          background: #fff;
          padding: 7.5px 15px;
          border-radius: 50px;
          min-height: 19px;
        }
        .top button {
          position: relative !important;
          left: 0 !important;
          width: 150px !important;
        }
      `}</style>
    </div>;
  }