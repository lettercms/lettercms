import { Component } from 'react';
import ImagesModal from './imagesModal';
import Tags from './tags';
import Images from './images';
import {EventEmitter} from 'events';
import createEditor from './lib/createEditor';
import Input from '../../input';
import sdk from '@lettercms/sdk';
import asyncImportScript from '@/lib/asyncImportScript';
import LogoLoad from '@/components/logoLoad';
import Router from 'next/router';
import Eye from '@/components/svg/preview';

export default class Editor extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      tags: [],
      images: [],
      url: '',
      thumbnail: '',
      postStatus: 'new',
      category: '',
      categories: [],
      isSaved: false,
      sending: false,
      showImagesModal: false,
      showEditorLoad: true,
      hasFacebook: false
    };

    this.changes = {};

    this.initialContent = '';

    this.editor = null;
    this.timeout = null;

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  async componentDidMount() {
    window.reactEditor = this;
    window.editorEventEmitter = new EventEmitter();

    if (this.props.accessToken)
      sdk.setAccessToken(this.props.accessToken);

    const {
      _id,
      title,
      description,
      images,
      postStatus,
      url,
      category,
      tags,
      isProtected,
      thumbnail,
      subdomain,
      content
    } = await sdk.posts.single(this.props.postID, [
        'title',
        'description',
        'images',
        'postStatus',
        'url',
        'category',
        'tags',
        'isProtected',
        'thumbnail',
        'subdomain',
        'content'
      ]);

    if (url)
      this.changes.url = url;


    this.setState({
      _id,
      title: title || '',
      description: description || '',
      images: !!images ? Object.assign([], images) : [],
      postStatus: postStatus || 'new',
      thumbnail:  thumbnail || '',
      url: url || '',
      category: 'null',//category === 'null' ? categories[0].name : category,
      tags: !!tags ? Object.assign([], tags) : [],
      isProtected,
      subdomain
    });

    try {
      this.initialContent = content;
      
      await asyncImportScript('ck-script', 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/editor/ckeditor.js', {defer: true, async: true});
      this.editor = await createEditor.bind(this)(content);

      this.setState({
        showEditorLoad: false
      });
    } catch(err) {
      throw err;
    }
  }

  componentWillUnmount() {
    this.editor.destroy();
    this.editor = null;
  
    document.getElementById('ck-script')?.remove();

    delete window.CKEDITOR_VERSION;
    delete window.CKEDITOR_TRANSLATIONS;
    delete window.ClassicEditor;

    window.editorEventEmitter.on('insert', () => null);
    window.editorEventEmitter.on('unsplash', () => null);

    delete window.editorEventEmitter;

  
    clearTimeout(this.timeout);
  }
  draft = async () => {
    clearTimeout(this.timeout);

    this.setState({
      sending: true
    });

    const {
      _id
    } = this.state;

    try {

      await sdk.createRequest(`/post/${_id}/draft`, 'POST');
    } catch(err) {
      return console.log(err);
    }

    this.setState({
      postStatus: 'draft',
      sending: false
    });
  }
  publish = async () => {
    clearTimeout(this.timeout);
    this.setState({
      sending: true,
    });

    const data = this._getData();

    try {
      await sdk.createRequest(`/post/${this.state._id}/publish`, 'POST', {
        ...data,
        promote: {
          facebook: this.state.hasFacebook
        }
      });
    } catch(err) {
      return console.log(err);
    }

    alert('Publicado con exito');

    this.close(true);
  }
  update = async () => {
    clearTimeout(this.timeout);
    this.setState({
      sending: true,
    });

    const data = this._getData();

    try {
      await sdk.createRequest(`/post/${this.state._id}/update`, 'POST', data);
    } catch(err) {
      return console.log(err);
    }

    alert('Actualizado con exito');

    this.setState({
      sending: false
    });
  }
  preview = async () => {
    clearTimeout(this.timeout);
  
    this.setState({
      sending: true,
    });

    const data = this._getData();

    try {
      await sdk.createRequest(`/post/${this.state._id}/update`, 'POST', data);
    } catch(err) {
      return console.log(err);
    }
  
    this.setState({
      sending: false
    });

    window.open(`https://${this.state.subdomain}.lettercms.vercel.app/api/preview?id=${this.state._id}`);
  }
  _getData = () => {
    const data = this.changes;

    if (data.hasContent) {
      delete data.hasContent;
      data.content = this.editor.getData();
    }

    const {
      tags,
      _id
    } = this.state;

    data.tags = typeof tags === 'string' ? tags.split(/\s*,\s*/) : tags;

    return data;
  }
  close = isSaved => {
    Router.push('/dashboard/posts');
  }

  handleInput({ target }) {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    this.setState({
      isSaved: false,
      [name]: value
    });

    this.changes[name] = value;

    if ((name === 'url' || name === 'title') && this.state.postStatus !== 'published') {
      const url = value.toLowerCase()
        .split(' ')
        .slice(0, 8)
        .join('-')
        .replace(/ñ/g, 'n')
        .replace(/á|à|â|ä/g, 'a')
        .replace(/é|è|ê|ë/g, 'e')
        .replace(/í|ì|î|ï/g, 'i')
        .replace(/ó|ò|ô|ö/g, 'o')
        .replace(/ú|ù|ü|û/g, 'u')
        .replace(/ñ/g, 'n')
        .replace(/"|'/g, '');

      this.setState({
        url
      });

      this.changes.url = url;
    }

    if (this.state.postStatus !== 'published') {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.update(), 5000);
    }
  }
  getTag = e => {
    if (e.key === 'Enter') {
      const {value} = e.target;

      const {
        tags
      } = this.state;

      const tgs = [value].concat(tags);

      this.setState({
        tags: tgs,
        isSaved: false,
      });

      this.changes.tags = tgs;

      e.target.value = ''; 
    }
  }
  removeTag = ind => {
    const newTags = this.state.tags.filter((_, i) => i !== ind);

    this.changes.tags = newTags;

    this.setState({
      tags: newTags,
      isSaved: false,
    });
  }
  setThumbnail = thumbnail => {
    this.changes = {
      ...this.changes,
      thumbnail
    };

    this.setState({
      thumbnail
    });
  }

  render() {
    const {
      categories,
      sending,
      showImagesModal,
      title,
      category,
      description,
      tags,
      url,
      postStatus,
      isSaved,
      ID,
      isProtected,
      images,
      thumbnail,
      subdomain,
      _id,
      showEditorLoad,
      hasFacebook
    } = this.state;

    const hasCategories = categories.length > 0;

  return <div id='editor-container'>
    {
      showEditorLoad &&
      <div className='splash'>
        <LogoLoad/>
      </div>
    }
    <div id='ck'/>
    <aside id='options'>
      <div id='opts-top'>
        <button type='button' tabIndex='-1' className='ck ck-button ck-off' onClick={() => this.close()}>
          <svg style={{color: '#333'}} className='ck ck-icon ck-button__icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/></svg>
        </button>
      </div>
      <div id='opts-body'>
        {
          hasCategories
          && <>
            <select onInput={this.handleInput} name="category" value={category}>
              {
                categories.map((e) => <option key={e.alias}>{e.alias}</option>)
              }
            </select>
            <hr/>
          </>
        }

      {/*<div className='selection'>
              <input type="checkbox" id="isProtected" name="isProtected" checked={isProtected} onInput={this.handleInput} />
              <label htmlFor='isProtected' className='option'>Proteger Entrada</label>
            </div>*/}
        <Input disabled={sending} id='title' value={title} onInput={this.handleInput} label='Título'/>
        <Input disabled={sending} id='description' value={description} onInput={this.handleInput} label='Descripción' type='textarea'/>
        <Input id='url' value={url} onInput={this.handleInput} label='Enlace' disabled={postStatus === 'published' || sending}/>
        <hr/>
        <div>
          <Input id='tags' onKeyUp={this.getTag} label='Etiqueta'/>
          <Tags data={tags} removeTag={this.removeTag}/>
        </div>
        <hr/>
        <div>
          <span>Miniatura</span>
          <Images images={images} actual={thumbnail} setThumbnail={this.setThumbnail}/>
        </div>
        <hr/>
        <div>
          <span>Promocionar en</span>
          <div className='selection'>
            <input type='checkbox' name='checkFacebook' id='checkFacebook' checked={hasFacebook} onChange={() => this.setState({hasFacebook: !hasFacebook})}/>
            <label className='option' htmlFor='checkFacebook'><img alt='' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/facebook.svg'/><span>Facebook</span></label>
          </div>
        </div>
      </div>
    </aside>
    <div id='buttons'>
      <button className="btn-outline-sm circle save" disabled={sending} title='Vista Previa' onClick={this.preview}>
        <Eye fill='#5f4dee'/>
      </button>
      <button className="btn-outline-sm circle save" disabled={sending || isSaved} title={postStatus === 'published' ? 'Convertir a Borrador' : 'Guardar'} onClick={() => postStatus === 'published' ? this.draft() : this.update()}>
        <Save fill='#5f4dee'/>
      </button>
      <button className="btn-outline-sm circle send" disabled={sending} title={postStatus === 'published' ? 'Actualizar' : 'Publicar'} onClick={() => this.publish()}>
        <Send fill='#fff'/>
      </button>
    </div>
    <ImagesModal show={showImagesModal} onClose={() => {this.setState({showImagesModal: false});}}/>
    <style jsx global>{`
    #content {
      padding: 0 !important;
      width: 100% !important;
      height: 100% !important;
      left: 0 !important;
    }
    #content > div:nth-child(1) {
      padding: 0 !important;
      width: 100% !important;
    }
    .ck.ck-editor {
        width: 75% !important;
    }
    .ck.ck-editor__main {
      height: calc(100% - 3.8rem);
      padding: 0 10%;
    }
    .ck-rounded-corners .ck.ck-editor__main>.ck-editor__editable, .ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners,
    .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {
      height: 100%;
    }
    .ck.ck-button.ck-button_with-text, a.ck.ck-button.ck-button_with-text {
      padding: .3rem .6rem;
      border-radius: 5px;
    }
    .ck.ck-toolbar__items {
      padding: .5rem 0 !important;
    }
    .ck.ck-button:not(.ck-disabled):hover, a.ck.ck-button:not(.ck-disabled):hover {
      background: #5f4dee77;
    }
    .ck.ck-toolbar .ck.ck-toolbar__separator,
    .ck.ck-button.ck-on, a.ck.ck-button.ck-on {
      background: #5f4dee;
    }
    .ck.ck-button.ck-on .ck.ck-icon,
    .ck.ck-button.ck-on .ck.ck-icon * {
      color: white;
    }
    `}</style>
    <style jsx>{`
      .splash {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 99999999999999999;
        background: #f7f7f7;
      }
      #opts-top {
        width: 100%;
        background: var(--ck-color-toolbar-background);
        padding: .5rem 0;
      }
      hr {
        border: .5px #5f4dee solid;
        width: 90%;
      }
      #back {
        filter: invert(.5);
        transform: rotate(90deg);
        width: 25px;

        cursor: pointer;
      }
      #editor-container {
        display: flex;
        height: 100%
      }
      aside {
        width: 25%;
        max-height: 100%;
        position: relative;
      }
      aside #opts-body {
        display: flex;
        flex-direction: column;
        background: #fff;
        padding: 1rem 2rem;
        overflow-y:auto;
        height: calc(100% - 3.75rem);
      }
      aside div span {
        margin-bottom: 15px;
        display: block;
        color: #bdbdbd;
      }
      #opts-top button {
        width: fit-content;
        margin: 0 1rem;
      }
      div#buttons {
        display: flex;
        position: absolute;
        flex-direction: column;
        right: 26%;
        bottom: 0;
      }
      div#buttons button {
        width: 4.5rem;
        height: 4.5rem;
        margin: 12.5% 0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.4rem;
      }
      div#buttons button:disabled {
        background: #c4d8dc !important;
        border-color: #c4d8dc !important;
        cursor: default;
      }
      :global(div#buttons button:disabled path) {
        fill: #fff !important;
      }
      div#buttons button.send {
        background: #5f4dee;
      }
      div#buttons button.send:hover {
        background: #fff;
      }
      :global(div#buttons button.send:hover path) {
        fill: #5f4dee;
      }
      div#buttons button.save {
        background: #fff;
      }
      div#buttons button.save:hover {
        background: #5f4dee;
      }
      :global(div#buttons button.save:hover path) {
        fill: #fff;
      }
      select {
        border: none;
        padding: 10px 5%;
        background: #1d1d1d;
        color: #bdbdbd;
      }
      select:hover {
        background: #2d2d2d
      }
      select:focus {
        outline: none;
      }
      #tags li {
        width: 100%;
        cursor: pointer;
      }
     `}</style>
  </div>;
  }
}
