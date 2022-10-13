import { Component } from 'react';
import BaseLoad from '../stats/baseLoad';
import AccountLoad from './accountLoad';
import Top from '../top';
import dynamic from 'next/dynamic';
import sdk from '@lettercms/sdk';
import ConfigAside from './configAside';
import asyncImportScript from '../../../lib/asyncImportScript';

const Blog = dynamic(() => import('./blogConfig'), {
  loading: () => <div className='config-opts'>
    <BaseLoad rows={1}/>
  </div>
});
/*const Payment = dynamic(() => import('./payment'), {
  loading: () => <div className='config-opts'>
    <BaseLoad rows={2}/>
    <BaseLoad rows={2}/>
  </div>,
  ssr: false
});*/
const Usage = dynamic(() => import('./usage'), {
  loading: () => <div className='config-opts'>
    <BaseLoad rows={1}/>
  </div>,
  ssr: false
});
const Account = dynamic(() => import('./accountConfig'), {
  loading: () => <AccountLoad/>,
  ssr: false
});

class Config extends Component {
  constructor() {
    super();

    this.state = {
      canSave: false,
      categories: [],
      urlID: '',
      title: '',
      description: '',
      tab: 'blog'
    };

    this.handleInput = this.handleInput.bind(this);
    this.saveConfig = this.saveConfig.bind(this);

    this.changes = {};
  }

  handleInput({ target }, userID) {
    const { name, value } = target;

    this.changes[name] = value;


    if (userID) {
      this.setState({
        userID
      });
    }

    this.setState({
      [name]: name === 'title' || name === 'description' || name === 'urlID' ? value : undefined,
      canSave: true
    });
  }

  async saveConfig() {
    try {
      this.setState({
        canSave: false,
      });

      const {
        name,
        lastname,
        ocupation,
        userDescription,
        photo,
        website,
        facebook,
        twitter,
        instagram,
        linkedin,
        title,
        urlID,
        description,
      } = this.changes;

      if (title || urlID || description) {

        const { status } = await sdk.blogs.update({
          title,
          url: urlID,
          description
        });

        if (status !== 'OK') {
          alert('Error al guardar la configuración');

          return this.setState({
            canSave: true
          });
        }
      }

      if (
        name ||
        lastname ||
        ocupation ||
        userDescription ||
        photo ||
        website ||
        facebook ||
        twitter ||
        instagram ||
        linkedin
      ) {

        const { status } = await sdk.accounts.update(this.state.userID, {
          name,
          lastname,
          ocupation,
          description: userDescription,
          website,
          facebook,
          twitter,
          instagram,
          linkedin
        });

        if (status !== 'OK') {
          alert('Error al guardar la configuración');

          return this.setState({
            canSave: true
          });
        }
      }

      alert('Guardado Exitosamente');

      this.changes = {};

      this.setState({
        canSave: false
      });
    } catch (err) {
      this.setState({
        canSave: true
      });
      
      alert('Error al guardar la configuración');
      
      throw err;
    }
  }
  //componentWillUnmount = () => document.getElementById('_paypal').remove();
  componentDidMount() {
    /*asyncImportScript('_paypal', 'https://www.paypal.com/sdk/js?intent=capture&vault=false&client-id=Aa2IfcoEvHnfJRnVQLSFrSs3SmTTkv5N1weMEL66ysqYIeHfAqXpDVkjOv3vLhkhbP4eKB6MpRlQIcJw', 'js', {
      retry: true
    });*/

    setTimeout(async () => {
      try {
        const {
          categories,
          url: urlID,
          title,
          description,
          isVisible
        } = await sdk.blogs.single([
          'categories',
          'title',
          'description',
          'url',
          'isVisible'
        ]);

        this.setState({
          categories,
          urlID,
          title,
          description,
          isVisible
        });
      } catch (err) {
        alert('Error al obtener las categorías');
        throw err;
      }
    }, 1000);
  }

  render() {
    const {tab} = this.state;
    
    let UI;

    if (tab === 'blog')
      UI = <Blog state={this.state} handleInput={this.handleInput}/>;

/*    if (tab === 'payment')
      UI = <Payment/>;*/

    if (tab === 'account')
      UI = <Account handleInput={this.handleInput}/>;

    if (tab === 'usage')
      UI = <Usage/>;

    return (
      <div id="config-main">
        <Top
          buttonText='Guardar'
          create={this.saveConfig}
          disabled={!this.state.canSave}
        />
        <ConfigAside onChange={_tab => this.setState({tab: _tab})} active={tab}/>
        {UI}
        <style jsx global>{`
          .config-opts {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin: 15px auto 0;
            width: 75%;
            position: absolute;
            right: 0;
            padding: 0 10%;
          }
          ul.config-opts li {
            display: flex;
            flex-direction: column;
            margin: 25px 0;
            max-width: 400px;
          }
          ul.config-opts li span,
          ul.config-opts li button {
            margin: 15px 0;
          }
        `}</style>
        <style jsx>{`
          .title {
            flex-grow: 1;
          }
			  	#config-main {
			  		width: 100%;
			  	}
			  `}</style>
      </div>
    );
  }
}

export default Config;
