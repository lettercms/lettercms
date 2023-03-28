import React, { Component } from 'react';
import store from '../store';
import { hideAlert } from '../store/actions';

export default class Alert extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      show: false,
    };

    this.setTime = this.setTime.bind(this);
    this.clearTime = this.clearTime.bind(this);
    this.timeout = null;

    store.subscribe(() => {
      const { message, show } = store.getState().alert;

      this.setState({
        message,
        show,
      });

      if (show) {
        this.setTime();
      }
    });
  }

  setTime() {
    this.timeout = setTimeout(() => store.dispatch(hideAlert()), 5000);
  }

  clearTime() {
    clearTimeout(this.timeout);
  }

  render() {
    const { message, show } = this.state;

    return (
      <div id="alert" style={{ left: show ? 0 : '-100%' }} onMouseOver={this.clearTime} onMouseOut={this.setTime}>
        <span>{message}</span>
        <style jsx>
          {`
				#alert {
					position: fixed;
					padding: 20px 50px;
					max-width: 100%;
					background: #dddddd;
					bottom: 5%;
					color: black;
					box-shadow: 1px 1px 3px rgba(0,0,0,.5);
					border-radius: 0 5px 5px 0;
					display: flex;
					transition: ease .3s;
				}
				#alert img {
					width: 25px;
					margin: 0 0 0 10px;
				}
			`}
        </style>
      </div>
    );
  }
}
