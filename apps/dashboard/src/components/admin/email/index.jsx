import { Component } from 'react';
import Load from '../../logoLoad';
import dynamic from 'next/dynamic';
import Card from '../posts/card';
import Top from '../top';
import CardLoad from '../cardLoad';
import Layout from '../listLayout';
import asyncImportScript from '../../../lib/asyncImportScript';

const isDev = process.env.NODE_ENV !== 'production';

const Editor = dynamic(() => import('./editor'), {
  loading: Load,
  ssr: false
});

class Pages extends Component {
  constructor() {
    super();
    this.state = {
      pages: [],
      tab: 'all',
      editting: false,
      loading: true,
      editData: {},
    };

    this.pages = [];
  }
  componentWillUnmount = () => {
    document.getElementById('grapesjs-css').remove();
    document.getElementById('grapesplugin-css').remove();
    document.getElementById('grapesjs-script').remove();
    document.getElementById('grapesplugin-script').remove();
  }
  componentDidMount = () => {
    window.r = this;

    asyncImportScript('grapesjs-script',
      isDev
        ? '/editor/grapes.min.js'
        : 'https://unpkg.com/grapesjs/dist/grapes.min.js'
    )
      .then(() => asyncImportScript('grapesplugin-script',
        isDev
          ? '/editor/grapesjs-preset-newsletter.min.js'
          : 'https://unpkg.com/browse/grapesjs-preset-newsletter@0.2.20/dist/grapesjs-preset-newsletter.min.js'
      ));

    asyncImportScript('grapesjs-css',
      isDev
        ? '/editor/grapes.min.css'
        : 'https://unpkg.com/grapesjs@0.16.22/dist/css/grapes.min.css',
      'css'
    );
    
    asyncImportScript('grapesplugin-css',
      isDev
        ? '/editor/grapesjs-preset-newsletter.css'
        : 'https://unpkg.com/grapesjs-preset-newsletter@0.2.20/dist/grapesjs-preset-newsletter.css',
      'css'
    );
  }
  newPage = async () => {
    try {
      //const {data} = await letterSDK.pages.create();

      this.setState({ editting: true });
    } catch(err) {
      alert('Error al crear la pagina');
      throw new Error(err);
    }
  }

  edit = ID => this.setState({ editting: true, editData: {ID} });

  render() {
    const {pages, editting, editData, count, loading} = this.state;

    let ui;
    if (!editting)
        ui = <Layout
        picture='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/emails.svg'
        type='pages'
        fields={[
          'title',
          'pageStatus',
          'views',
          'url',
          'images'
        ]}
        tabs={[
          {name: 'published', alias: 'Publicados'},
          {name: 'draft', alias: 'Guardados'}
        ]}
        onEdit={console.log}
        onCreate={this.newPage}
        buttonText='Crear'
      />;
    else
      ui = <Editor data={editData} />;
    return (
      <div style={{ width: editting ? '100%' : '90%', height: '100%' }}>
        {ui}
      </div>
    );
  }
}
export default Pages;
