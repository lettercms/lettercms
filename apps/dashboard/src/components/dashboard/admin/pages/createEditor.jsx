import Router from 'next/router';
import sdk from '@lettercms/sdk';
import {createRoot} from 'react-dom/client';
import CustomPanel from './customPanel';
import pluginsOpts from './plugins.config';

/*
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';
//import 'grapesjs-style-bg';
//import 'grapesjs-typed';
import 'grapesjs-tooltip';
import 'grapesjs-parser-postcss';
import 'grapesjs-touch';
import 'grapesjs-custom-code';
import 'grapesjs-tabs';
import 'grapesjs-lory-slider';
import 'grapesjs-tui-image-editor';
import 'grapesjs/dist/css/grapes.min.css';*/

const isDev = process.env.NODE_ENV !== 'production';
const endpoint = isDev ? 'http://localhost:3009' : 'https://lettercms-api-staging.herokuapp.com';

class Editor {
  constructor() {
    this.changes = {};
    this.data = {};
    this.editor = {};
    this.onPreview = null;
  }
  async init(id) {
    try {
      this.data = await sdk.pages.single(id, ['title', 'url', 'description']);

      window._editor = this.editor = grapesjs.init({
        container: '#gjs',
        plugins: [
          'grapesjs-lory-slider',
          'grapesjs-tabs',
          'grapesjs-custom-code',
          'grapesjs-touch',
          'grapesjs-parser-postcss',
          'grapesjs-tooltip',
          'grapesjs-tui-image-editor',
          'grapesjs-typed',
          'grapesjs-style-bg',
          'gjs-preset-webpage',
        ],
        avoidInlineStyle: 1,
        fromElement: 1,
        showOffsets: 1,
        pluginsOpts,
        height: '100%',
        /*assetManager: {
          custom: {
            open(props) {
              //console.log(props);
              //TODO: Add custom modal
            },
            close(props) {
              // Close the external Asset Manager
            },
          },
        },*/
        selectorManager: { componentFirst: true },
        styleManager: { sectors: [] },
        storageManager: {
          type: 'remote',
          stepsBeforeSave: 5,
          autosave: true, // Store data automatically
          autoload: true, // Autoload stored data on init
          recovery: true,
          options: {
            remote: {
              contentTypeJson: true,
              urlStore: `${endpoint}/api/page/grapes/${this.data._id}`,
              urlLoad: `${endpoint}/api/page/grapes/${this.data._id}`,
              headers: {
                Authorization: sdk.accessToken,
                'X-Requested-With': ''
              },
              onStore: (data, editor) => {
                const html = editor.getHtml();
                const css = editor.getCss();

                return {
                  html,
                  css
                };
              },
              onLoad: res => {
                return {
                  pages: [
                      {
                        component: `
                          <div class="test">${res.html || ''}</div>
                          <style>${res.css || ''}</style>
                        `
                      }
                  ]
                };
              },
            }
          }
        },
        commands: {
          defaults: [
            {
              id: 'store-data',
              run(editor) {
                editor.store();
              }
            }
          ]
        }
      });

      this.editor.I18n.addMessages({
        en: {
          styleManager: {
            properties: {
              'background-repeat': 'Repeat',
              'background-position': 'Position',
              'background-attachment': 'Attachment',
              'background-size': 'Size',
            }
          },
        }
      });

      let pn = this.editor.Panels;
      let cmdm = this.editor.Commands;
      cmdm.add('canvas-clear', function() {
        if(confirm('Are you sure to clean the canvas?')) {
          editor.DomComponents.clear();
          setTimeout(() => localStorage.clear(), 0);
        }
      });
      cmdm.add('set-device-desktop', {
        run: function(ed) { ed.setDevice('Desktop'); },
        stop: function() {},
      });
      cmdm.add('set-device-tablet', {
        run: function(ed) { ed.setDevice('Tablet'); },
        stop: function() {},
      });
      cmdm.add('set-device-mobile', {
        run: function(ed) { ed.setDevice('Mobile portrait'); },
        stop: function() {},
      });


      pn.getPanel('views').get('buttons').add({
        id: 'custom-view',
        command: 'open-config',
        className: 'fa fa-edit',
        title: 'Metadata'
      });
      
      pn.getPanel('options').get('buttons').add({
        id: 'custom-back',
        command: 'editor-back',
        className: 'fa fa-chevron-left',
        title: 'Back'
      });

      cmdm.add('open-config', () => {
        const el = pn.getPanel('views-container').view.el;

        const div = el.querySelector('div#custom-panel');

        div.style.display = 'block';
      });

      cmdm.add('editor-back', this.close);

      return new Promise(resolve => {
        this.editor.on('load', () => {
          this.createView();

          this.editor.on('run:preview', () => this.onPreview(true));
          this.editor.on('stop:preview', () => this.onPreview(false));

          this.editor.on('run:open-sm', this.hidePanel);
          this.editor.on('run:open-tm', this.hidePanel);
          this.editor.on('run:open-layers', this.hidePanel);
          this.editor.on('run:open-blocks', this.hidePanel);

          resolve();
        });
      });

    } catch(err) {
      throw err;
    }
  }
  publish = () => {
    if (!this.changes.url)
      return alert('No se puede publicar sin una URL');

    this.editor.store(async () => {
      try {
        await sdk.pages.publish(this.data._id, this.changes);

        Router.push('/dashboard/pages');
      } catch(err) {
        throw err;
        alert('Error al publcar la entrada');
      }
    });
  };

  hidePanel = () => {
    const panels = this.editor.Panels;

    const {el} = panels.getPanel('views-container').view;

    const div = el.querySelector('div#custom-panel');
      
    if (div)
      div.style.display = 'none';
  };
  createView = () => {

    const panels = this.editor.Panels;
    
    const div = document.createElement('div');

    div.id = 'custom-panel';
    div.style.display = 'none';
    div.style.padding = '0 5px';

    const {el} = panels.getPanel('views-container').view;

    el.appendChild(div);

    createRoot(div).render(<CustomPanel {...this.data} onChange={this.handleInput}/>);
  };

  handleInput = ({ target }, url) => {
    const { name, type } = target;

    let value = type === 'checkbox' ? target.checked : target.value;

    this.changes[name] = value;

    if (url && name === 'title')
      this.changes.url = url;
  };
  save = () => this.editor.store();
  close = () => {
    this.editor.destroy();
    Router.push('/dashboard/pages');
  };
}

export default Editor;
