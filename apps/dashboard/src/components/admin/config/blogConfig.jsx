import {Component} from 'react';
import sdk from '@lettercms/sdk';
import Categories from './blogCategories';
import Load from '../../loadBar';
import Input from '../../input';
import Container from '../stats/base';
import BlogTitle from './blog/title';
import BlogCategory from './blog/categories';
import BlogUrl from './blog/url';
import BlogImport from './blog/import';
import BlogDelete from './blog/delete';
import Thumbnail from './blog/thumbnail';

export default class BlogConfig extends Component{
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      alias: '',
      showModal: false,
      categories: props.state.categories,
      thumbnail: props.state.thumbnail
    };
  }
  filterCategory = categories => this.setState({
    categories
  });
  addCategory = async (name, alias) => {
    try {
      const {status} = await sdk.blogs.addCategory({
        name,
        alias
      });

      if (status === 'OK') {
        const {categories} = this.state;

        categories.push({
          name,
          alias,
        });

        this.setState({
          categories
        });
      } else {
        alert('Error when set Category');
      }
    } catch(err) {
      alert('Sorry... Something went wrong');
      throw err;
    }
  }
  
  render() {
    const {title, description, urlID, sending, isVisible, thumbnail} = this.props.state;
    const {handleInput} = this.props;
    const {categories, category, alias, showModal} = this.state;

    return <>
      { sending && <Load/> }
      <ul className='config-opts'>
        <Thumbnail url={thumbnail}/>
        <Container rows={1} title='Meta' style={{height: 'auto !important'}}>
          <BlogTitle isVisible={isVisible} title={title} description={description} onChange={handleInput}/>
        </Container>
        <Container rows={1} title='Categorias' style={{height: 'auto !important'}}>
          <BlogCategory categories={categories} category={category} alias={alias} onChange={({target: {value}}) => this.setState({category: value})} onAddCategory={this.addCategory} onDeleteCategory={this.filterCategory}/>
        </Container>
        <Container rows={1} title='Ruta de las entradas' style={{height: 'auto !important'}}>
          <BlogUrl urlID={urlID} onChange={handleInput} categories={categories}/>
        </Container>
        <Container rows={2} title='Datos' style={{height: 'auto !important'}}>
          <BlogImport/>
        </Container>
        <Container rows={2} title='Eliminar Blog' style={{height: 'auto !important'}}>
          <BlogDelete/>
        </Container>
      </ul>
      <style jsx>{`
        :global(.chart-container > div) {
          width: 70%
        }
        hr {
          width: 100%;
        }
        button {
          max-width: 200px;
        }
        button:disabled {
          background: white;
        }
      `}</style>
    </>;
  }
}
