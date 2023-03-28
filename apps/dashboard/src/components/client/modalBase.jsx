import React, {Component} from 'react';

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
  render = ({children}, {display, opacity}) => {
    return <div>
      <div id="shadow" style={{ display, opacity }}>
        <div id="subscription-main">
          <img src="/assets/arrow.svg" onClick={this.props.close} />
          {children}
        </div>
      </div>
      <style jsx>
       {`
        #shadow {
          top: 0;
          left: 0;
          background: rgba(0,0,0,.5);
          position: fixed;
          width: 100%;
          height: 100%;
          justify-content: space-around;
          align-items: center;
          z-index: 1;
          transition: ease .6s;
        }
        #shadow #subscription-main {
          position: relative;
          padding: 15px;
          max-width: 400px;
          background: #f7f7f7;
          border-radius: 5px;
        }
        :global(#shadow #subscription-main form,
        #shadow #subscription-main div) {
          display: flex;
          flex-direction: column;
          position: absolute;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          height: 80%;
          top: 10%;
        }
        :global(#shadow #subscription-main div) {
          text-align: center;
        }
        :global(#shadow #subscription-main form span) {
          text-align: center;
        }
        :global(input[type="email"].invalid) {
          border: #F44336 solid 2px;
        }
        #shadow #subscription-main img {
          cursor: pointer;
          transform: rotate(90deg);
          position: absolute;
          top: 10px;
          left: 10px;
        }
      `}
      </style>
    </div>;
  };
}