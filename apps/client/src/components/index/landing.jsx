import React, { Component } from 'react';
import dynamic from 'next/dynamic';

const Subscribe = dynamic(() => import('./subscribeButton'), {
    loading: () => <img src='/assets/spinner.svg' style={{
        animation: 'rotation linear .6s infinite',
        width: 70
    }}/>
});

class Landing extends Component {
  state = {
    clientHeight: null,
  };

  componentDidMount = () => {
    this.setState({
      clientHeight: window.screen.availHeight,
    });
  }

  render() {
    const { isSubscribe, description } = this.props;
    const {clientHeight} = this.state;

     return (
      <div>
        <header style={{ height: clientHeight }}>
          <div id="header-shadow">
            <div id='landing-description'>
              <img src="/images/davidsdevel-rombo.png" className='mobile'/>
              <span>{isSubscribe ? description : 'Mantente al tanto de las actualizaciones de mi blog'}</span>
            </div>
            <div id='landing-image'>
              <img src="/images/davidsdevel-rombo.png" className='desktop'/>
            </div>
            <div id='landing-scroll'>
              <button id="circle" onClick={() => { scroll(0, clientHeight - 70);}}>
                <img src="/assets/arrow.svg" />
              </button>
            </div>
          </div>
        </header>
        <style jsx>
          {`
          .mobile {
            display: block;
          }
          .desktop {
            display: none;
          }
				header {
					width: 100%;
					height: 640px;
					display: block;
					background-image: url(/images/landing-mobile.jpg);
					background-position: center;
    			background-size: cover;
					overflow: hidden;
					position: relative;
				}
				#header-shadow {
					height: 100%;
					overflow: hidden;
					display: flex;
          flex-wrap: wrap;
					flex-direction: column;
					justify-content: space-evenly;
					align-items: center;
					width: 100%;
					background: rgba(0, 0, 0, .5)
				}
				#header-shadow > div {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: column;
          width: 100%
        }
				#header-shadow #landing-description {
          flex-grow: 4;
        }
				#header-shadow #landing-image {
          flex-grow: 2;
        }
				#header-shadow #landing-scroll {
          flex-grow: 1;
        }
				#header-shadow img {
					width: 30%;
				}
				header span {
    			display: block;
    			font-size: 28px;
    			font-weight: bold;
    			color: white;
    			text-align: center;
				}
				header button#circle {
					border-radius: 50%;
    			padding: 0;
    			width: 60px;
    			border: 0;
    			height: 60px;
    			box-shadow: rgba(0, 0, 0, .5) 2px 2px 3px;
    			cursor: pointer;
				}
				header button#circle img {
					width: 40%;
				}
				@media screen and (min-width: 480px) {
					#header-shadow img {
						width: 20%;
    			}
    			header {
						background-image: url(/images/landing-mobile-480p.jpg);
					}
				}
				@media screen and (min-width: 720px) {
          .mobile {
            display: none;
          }
          .desktop {
            display: block;
          }
          header {
						background-image: url(/images/landing-desktop.jpg);
          }
          ${isSubscribe ? '#header-shadow img {width: 30% !important;}':''}
					#header-shadow {
						flex-direction: row;
						justify-content: space-between;
            align-items: center;
          }
          #header-shadow #landing-description,
          #header-shadow #landing-image {
            height: 60%;
            width: 50%;
          }
					header span {
						padding: 0 0 0 5%;
  					font-size: 35px;
   					text-align: left;
					}
				}
				@media screen and (min-width: 960px) {
					header {
						background-image: url(/images/landing-desktop-960p.jpg);
					}
				}
			`}
        </style>
      </div>
    );
  }
}
export default Landing;
