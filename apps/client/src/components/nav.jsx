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
        <div
          style={mobileBar}
          className='
            shadow
            shadowy-1
            shadowx-2
            bg-white
            h-12
            px-[5%]
            py-8
            fixed
            w-full
            transition-ease
            transition-4
          '>
          <img
            onClick={this.toggleMenu}
            className='
              absolute
              top-4
              left-[5%]
              cursor-pointer
            '
            src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/menu.svg"
          />
          <div className='
            rounded-full
            absolute
            right-[2.5%]
            top-4;
            transition-ease
            transition-5
            bg-slate-100
          '
          style={{ background: inputBackground }}>
            <img
              className="
                inline
                h-4
                m-2
                transition-ease
                transition-5s
                cursor-pointer
              "
              onClick={this.toggleSearch}
              style={{ float: 'left' }}
              src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/search.svg"
            />
            <input
              onKeyUp={this.find}
              value={search}
              className="
                inline
                bg-slate-100
                border-none
                h-8
                transition-ease
                transition-5


                :placeholder:color-black
                :placeholder:opacity-1

                :focus:outline-0
                :focus:text-black
              "
              style={inputStyle}
              type="text"
              placeholder="Busqueda"
              onInput={this.handleInput}
            />
            <Link preload={false} href={`/search?q=${search}`}>
              <a>
                <img className="inline" id="arrow" style={{ ...arrowStyle, float: 'right' }} src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/arrow.svg" />
              </a>
            </Link>
          </div>
        </div>
        <div
          className='
            fixed
            w-full
            h-full
            bg-[#0004]
            top-0
          '
          style={shadowStyle}
          onClick={this.toggleMenu}
        />
        <ul
          className='
            m-0
            fixed
            bg-white
            w-1/4
            h-full
            top-0
            mw-100
          '
          style={menuStyle}
        >
          <button style={{ float: 'right' }} onClick={this.toggleMenu}>
            <img
              className='
                w-1/4
                mt-4
                mb-10
                mx-auto
                block
              '
              src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/cross.svg"
            />
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
			`}
        </style>
      </nav>
    );
  }
}

export default Nav;
