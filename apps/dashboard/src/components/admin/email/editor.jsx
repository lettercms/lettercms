import { Component } from 'react';

export default class EmailEditor extends Component {
  constructor() {
    super();

    this.editor = null;

    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    window.editor = this.editor = window.grapesjs.init({
      container : '#gjs',
      height: '100%',
      plugins: ['gjs-preset-newsletter'],
      pluginsOpts: {
        'gjs-preset-newsletter': {
          modalTitleImport: 'Import template'
        }
      },
      assetManager: {
        upload: '/upload/images',
        uploadName: 'files',
        //assets: images.map(e => e.src),
        autoAdd: 1,
        dropzone: 1,
        dropzoneContent: '<div class="dropzone-inner">Suelta las imagenes aqui</div>'
      },
      storageManager: {
        type: 'remote',
        stepsBeforeSave: 10,/*
        urlStore: '/api/pages/save?ID=' + this.props.data.ID,
        urlLoad: '/api/pages/single-edit?ID='+this.props.data.ID ,*/
        headers: {},
        autosave: false,
      }
    });
  }
  render() {
    return <div id='gjs'>
      <style jsx global>{`
        #content {
          padding: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
        }
        .gjs-one-bg {
          background-color: #5f4dee !important;
        }
      `}</style>
    </div>;
  }
}
