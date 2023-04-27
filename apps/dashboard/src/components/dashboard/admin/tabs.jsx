import {Component} from 'react';

export default class Tab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.tabs[0]
    };
  }
  changeTab = tab => {
    this.setState({
      active: tab
    });

    this.props.onChange(tab);
  };
  render() {
    const {tabs} = this.props;
    const {active} = this.state;

    return <div className='tabs-container'>
      <ul>
      {
        tabs.map(e => {
          const name = e[0].toUpperCase() + e.slice(1);
          const isActive = active === e;

          return <li key={`tab-${e}`} className={isActive ? 'active' : ''} onClick={isActive ? null : () => this.changeTab(e)}>{name}</li>;
        })
      }
      </ul>
      <style jsx>{`
        ul {
          display: flex;
          background: #1282a2;
          list-style: none;
        }
        ul li {
          padding: 10px 25px;
          cursor: pointer;
          color: #eee;
          transition: ease .3s;
          border-radius: 5px 5px 0 0;
        }
        ul li.active {
          background: #f7f7f7;
          border: none;
          cursor: default;
          color: #000;
        }
        ul li:hover {
          background: rgba(255, 255, 255, .2);
        }
        ul li.active:hover {
          background: #f7f7f7;
        }
      `}</style>
    </div>;
  }
}