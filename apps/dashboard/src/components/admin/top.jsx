import {Component} from 'react';
import Tabs from './tabs';

export default class Top extends Component {
  state = {
    count: {}
  };

  render() {
    const {active, countTabs, data, create, loading, count, buttonText,onChangeTab, tabs, disabled, buttonRef} = this.props;

    let counts;

    if (loading)
      counts = <span style={{width: 70}}/>;
    else if (data && countTabs && !loading) {

      const totalTabs = count.all;
      const totalIsActive = count.all > 0;

      counts = <>
        <button
          className={`selector-button${active === '*' ? ' button-focus' : ''}`} 
          style={{
            cursor: totalIsActive ? 'pointer' : 'default',
            maxWidth: 'fit-content'
          }}
          disabled={!count.all}
          onClick={() => this.props.onFilter('*') }
          >
          {`Todos (${count.all})`}
        </button>
        {
          countTabs.map(e => {
            let tabCount = count[e.name];
            let isActive = tabCount > 0;

            return <button
              className={`selector-button${active === e.name ? ' button-focus' : ''}`}
              key={e.name}
              style={{
                cursor: isActive ? 'pointer' : 'default',
                maxWidth: 'fit-content',
                margin: '0 5px',
              }}
              disabled={!tabCount}
              onClick={() => active === e.name ? null : this.props.onFilter(e.name) }
            >
              <span>{e.alias}</span>
              <span>{` (${tabCount || 0})`}</span>
            </button>;
          })
        }
      </>;
    }

    return <div className='top-static'>
      <div className='top-fixed'>
        <div className="top">
          <button className="btn-outline-lg"  ref={buttonRef} onClick={create} disabled={loading || disabled}>{buttonText || 'Create'}</button>
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
          border-color: #fefcfb;
          background-color: #fefcfb;
          color: #1282a2;
        }
        .button-focus,
        .selector-button:enabled:hover {
          border-color: #f3f7fd;
          background-color: transparent;
          color: #fff; 
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
        .btn-outline-lg {
          border-color: #f3f7fd;
          color: #f3f7fd;
        }
        .btn-outline-lg:hover {
          background: #f3f7fd;
          color: #5f4dee;
        }
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
          background: #333;
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
}
