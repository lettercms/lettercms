import React from 'react';
import store from '../../store';
import { showModal } from '../../store/actions';

const SubscribeButton = () => <div id="subscription">
  <div id="one" />
  <div id="two" />
  <div id="tree" />
  <div id="four" />
  <button className="black" onClick={() => store.dispatch(showModal())}>Suscríbete</button>
  <style jsx>{`
    div#subscription {
    width: calc(80% - 100px);
    position: relative;
	}
	button.black {
    	font-weight: bold;
    	width: 100%;
	}
	div#subscription div {
		width: 25px;
		height: 25px;
		border: solid rgba(255, 255, 255, .3) 0px;
		position: absolute;
	}
	div#subscription div#one {
		border-right-width: 1px;
		border-bottom-width: 1px;
		top: -50px;
		left: -50px;
	}
	div#subscription div#two {
		border-left-width: 1px;
		border-bottom-width: 1px;
		top: -50px;
		right: -50px;
	}
	div#subscription div#tree {
		border-left-width: 1px;
		border-top-width: 1px;
		bottom: -50px;
		right: -50px;
	}
	div#subscription div#four {
		border-right-width: 1px;
		border-top-width: 1px;
    bottom: -50px;
    left: -50px;
  }
    @media screen and (min-width: 480px) {
    	div#subscription {
    		width: 50%;
    	}
    }
    @media screen and (min-width: 720px) {
    	div#subscription {
    		width: 40%;
    	}
    }
  `}</style>
</div>;

export default SubscribeButton;
