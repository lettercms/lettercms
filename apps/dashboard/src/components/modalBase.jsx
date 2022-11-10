import Cross from '@/components/svg/cross';
import {Component} from 'react';

export default class ModalBase extends Component {
  state = {
    display: 'none',
    opacity: 0
  };
  
  show = () => {
    this.setState({
      display: 'flex',
    });

    setTimeout(() => this.setState({ opacity: 1 }), 100);
  };

  hide = () => {
    this.setState({
      opacity: 0,
    });

    setTimeout(() => this.setState({ display: 'none' }), 610);
  };
  componentDidUpdate = (props, state) =>  {
    const isDifferent = props.show !== this.props.show;

    if (this.props.show === true && isDifferent) {
      this.show();
    } else if (this.props.show === false && isDifferent) {
      this.hide();
    }
  };
  render() {
    const {children, width = '90%', height = '90%'} = this.props;
    const {display, opacity} = this.state;

    return <div>
      <div id="shadow" style={{ display, opacity }}>
        <div id="subscription-main" style={{width, height}}>
          <div id='modal-top'>
            <div id='close-image-container'>
              <Cross fill='#fff' height='30'/>
            </div>
          </div>
          {children}
        </div>
      </div>
      <style jsx>
       {`
        #modal-top {
          height: 70px;
          position: absolute;
          width: 100%;
          left: 0;
          background: #5f4dee;
          overflow: hidden;
          border-radius: 5px 5px 0 0;
          top: 0;
        }
        #modal-top #close-image-container {
          top: 20px;
          left: 1rem;
          width: 40px;
          height: 40px;
          transform: rotate(90deg);
          cursor: pointer;
          position: absolute;
        }
        #shadow {
          top: 0;
          left: 0;
          background: rgba(0,0,0,.5);
          position: fixed;
          width: 100%;
          height: 100%;
          justify-content: space-around;
          align-items: center;
          z-index: 100000;
          transition: ease .6s;
        }
        #shadow #subscription-main {
          position: relative;
          background: #f7f7f7;
          border-radius: 5px;
          padding: 80px 5% 20px;
          transition: ease .6s;
        }
      `}
      </style>
    </div>;
  };
}