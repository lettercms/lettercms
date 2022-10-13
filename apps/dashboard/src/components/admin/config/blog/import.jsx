import {Component} from 'react';
import Modal from '../../../modalBase';
import toJSON from '../XmlToJSON';
import generateBlogger from '../generateBloggerJSON';
import sdk from '@lettercms/sdk';

export default class BlogImport extends Component {
  state = {
    showModal: false
  }
  sendBlogData = cms => {
    if (this.state.sending)
      return;

    let input = document.getElementById('input-data');

    if (input === null) {
      input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'application/xml');
      input.id = 'input-data';

      input.onchange = ({ target }) => {
        const { files } = target;
        const file = files[0];

        const reader = new FileReader();

        reader.readAsText(file);

        reader.onloadend = async e => {
          try {
            //setSendState(true);

            const obj = toJSON(e.target.result);

            let data;
            if (cms === 'blogger')
              data = generateBlogger(obj);

            await Promise.allSettled(data.map(e => sdk.posts.create(e)));

            //setSendState(false);
          } catch (err) {
            alert('Error al importar');

            throw err;
          } finally {
            this.setState({
              showModal: false
            });
          }
        };
      };
    }

    input.click();
  }
  render() {
    const {showModal} = this.state;

    return <div>
          <div>
            <button className="black" onClick={() => this.setState({showModal: true})}>Importar</button>
            {/*<button className="black">Exportar</button>*/}
          </div>
          <Modal show={showModal} close={() => this.setState({showModal: false})} height='max-content' width='max-content'>
        <ul id="modal">
          <li>
            <img alt='blogger logo' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/blogger.png' onClick={() => this.sendBlogData('blogger')}/>
          </li>
          {/*
          <li>
            <img alt='wordpress logo' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/wordpress.png' onClick={() => this.sendBlogData('wordpress')}/>
          </li>
          <li>
            <img alt='davidsdevel logo' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/davidsdevel-rombo.png' onClick={() => this.sendBlogData('this')}/>
          </li>*/}
        </ul>
      </Modal>
      <style>{`
        ul#modal {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
        }
        ul#modal li {
          margin: 0 15px;
        }
        ul#modal li img {
          width: 75px;
          cursor: pointer;
        }
      `}</style>
        </div>;
      }
    }