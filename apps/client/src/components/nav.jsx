import { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';

const links = [
  { href: '/search', label: 'Busqueda' }
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

class Nav extends Component {
  state = {
    main: '/',
    searchIsOpen: false,
    menuIsOpen: false,
    arrowStyle: {
      width: 0,
      opacity: 0,
    },
    inputStyle: {
      width: 0,
      opacity: 0,
    },
    shadowStyle: {
      opacity: 0,
      display: 'none',
    },
    menuStyle: {
      left: '-100%',
    },
    mobileBar: {
      top: '-72px',
    },
    inputBackground: 'none',
  };

  handleInput = ({ target }) => {
    const { value } = target;
  }

  toggleMenu = () => {
    if (this.state.menuIsOpen) {
      this.setState({
        menuStyle: {
          left: '-100%',
        },
        shadowStyle: {
          opacity: 0,
        },
        menuIsOpen: false,
      });
      setTimeout(() => this.setState({
        shadowStyle: {
          opacity: 0,
          display: 'none',
        },
      }), 310);
    } else {
      this.setState({
        menuStyle: {
          left: 0,
        },
        shadowStyle: {
          display: 'block',
          opacity: 0,
        },
        menuIsOpen: true,
      });
      setTimeout(() => this.setState({
        shadowStyle: {
          display: 'block',
          opacity: 1,
        },
      }), 10);
    }
  }

  toggleSearch = () => {
    if (this.state.searchIsOpen) {
      this.setState({
        inputWidth: undefined,
        arrowStyle: {
          width: 0,
          opacity: 0,
        },
        inputStyle: {
          width: 0,
          opacity: 0,
        },
        inputBackground: 'none',
        searchIsOpen: false,
        titleOpacity: 1,
      });
    } else {
      this.setState({
        inputWidth: '70%',
        inputStyle: {
          width: 'calc(100% - 76px)',
        },
        arrowStyle: {
          width: '18px',
        },
        inputBackground: '#f1f1f1',
        searchIsOpen: true,
        titleOpacity: 0,
      });
    }
  }

  componentDidMount = () => {
    if (!this.props.main) {
      fetch('/api/blog')
        .then(e => e.json())
        .then(e => this.setState({main: e.blog.mainUrl}));
    }
    if (document.body.clientWidth >= 720) {
      this.setState({
        mobileBar: {
          top: '-1px',
        },
      });
    }
    document.body.onscroll = () => {
      this.setState({
        inputWidth: undefined,
        arrowStyle: {
          width: 0,
          opacity: 0,
        },
        inputStyle: {
          width: 0,
          opacity: 0,
        },
        inputBackground: 'none',
        searchIsOpen: false,
        titleOpacity: 1,
      });

      if (document.body.clientWidth < 720) {
        const top = document.documentElement.scrollTop;

        if (top >= window.screen.availHeight - 70) {
          this.setState({
            mobileBar: {
              top: '-1px',
            },
          });
        } else {
          this.setState({
            mobileBar: {
              top: '-72px',
            },
          });
        }
      }
    };
  }

  find = ({ key }) => {
    if (key === 'Enter') {
      Router.push(`/search?q=${this.state.search}`);
    }
  }

  render() {
    const {props} = this;
    const {
      mobileBar, inputBackground, inputStyle, search, menuStyle, shadowStyle, arrowStyle, main
    } = this.state;

    return (
      <nav id="nav">
        <div id="mobile-bar" style={mobileBar}>
          <img onClick={this.toggleMenu} id="menu-icon" src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/menu.svg" />
          <div id="input" style={{ background: inputBackground }}>
            <img className="inline" onClick={this.toggleSearch} style={{ float: 'left' }} src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/search.svg" />
            <input onKeyUp={this.find} value={search} className="inline search" style={inputStyle} type="text" placeholder="Busqueda" onInput={this.handleInput} />
            <Link preload={false} href={`/search?q=${search}`}>
              <a>
                <img className="inline" id="arrow" style={{ ...arrowStyle, float: 'right' }} src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/arrow.svg" />
              </a>
            </Link>
          </div>
        </div>
        <div id="shadow" style={shadowStyle} onClick={this.toggleMenu} />
        <ul id="menu" style={menuStyle}>
          <button style={{ float: 'right' }} onClick={this.toggleMenu}>
            <img src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/cross.svg" />
          </button>
          <img src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/davidsdevel-black.png" />
          <li>
            <Link preload={false} href={props.main || main}>
              <a onClick={this.toggleMenu}>Inicio</a>
            </Link>
          </li>
          {links.map(({ key, href, label }) => (
            <li key={key}>
              <Link preload={false} href={href}>
                <a onClick={this.toggleMenu}>{label}</a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>
          {`
				#nav #mobile-bar {
					background: white;
					box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
					width: 90%;
					height: 40px;
					padding: 15px 5%;
					position: fixed;
					z-index: 1;
					transition: ease .4s;
				}
				#nav .inline {
					display: inline-block;
				}
				#nav #menu-icon {
					position: absolute;
					top: 17px;
					left: 5%;
					z-index: 2;
					cursor: pointer;
				}
				#nav #input {
					border-radius: 50px;
					position: absolute;
					right: 2.5%;
					top: 17px;

					transition: ease .5s;
				}
				#nav #input img {
					height: 18px;
					margin: 10px 10px;
					
					transition: ease .5s;
					cursor: pointer;
				}
				#nav #input input {
					background: none;
					border: none;
					height: 34px;
					color: gray;

					transition: ease .5s;
				}
				#nav #input input::placeholder {
					color: black;
					opacity: 1;
				}
				#nav #input input::-ms-input-placeholder {
					color: black;
				}
				#nav #input input:focus {
					outline: none;
					color: black;
				}
				#nav #input #arrow {
					transform: rotate(270deg);
				}
				#nav #shadow, #nav #menu {
					transition: ease .3s;
				}
				#nav #shadow {
					position: fixed;
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, .3);
					top: 0;
					z-index: 1;
				}
				#nav #menu {
					margin: 0;
					position: fixed;
					background: white;
					width: 70%;
					height: 100%;
					top: 0;
					z-index: 1;
				}
				#nav #menu > img {
					width: 25%;
					margin: 15px auto 45px;
					display: block;
				}
				#nav #menu li {
					transition: ease .3s;
					margin-left: -40px;
					width: calc(100% + 40px);
				}
				#nav #menu li:hover {
					background: #f3f5f7;
				}
				#nav #menu li a {
					color: blue;
					width: 100%;
					padding: 20px 0;
					text-align: center;
					display: block;
				}
				#nav #menu button {
					float: right;
					background: none;
					border: none;
					cursor: pointer;
					width: 20px;
					margin: 10px 10px 0 0;
				}
				#nav #menu button img {
					width: 100%;
				}
				@media screen and (min-width: 480px) {
					#nav #menu {
						width: 55%;
					}
				}
				@media screen and (min-width: 720px) {
					#nav #menu {
						width: 40%;
					}
				}
				@media screen and (min-width: 960px) {
					#nav #menu {
						width: 30%;
					}
				}
			`}
        </style>
      </nav>
    );
  }
}

export default Nav;
