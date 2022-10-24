import {Component} from 'react';
import {createBlog} from '@lettercms/admin';
import Router from 'next/router';
import Input from '../input';
import Image from 'next/image';

export default class BlogTab extends Component {
  state = {
    isLoad: false
  }
  handleInput = ({target: {name, value}}) => this.setState({
    [name]: name === 'subdomain'
      ? value.toLowerCase()
        .split(' ')
        .slice(0, 8)
        .join('-')
        .replace(/ñ/g, 'n')
        .replace(/\./g, '-')
        .replace(/á|à|â|ä/g, 'a')
        .replace(/é|è|ê|ë/g, 'e')
        .replace(/í|ì|î|ï/g, 'i')
        .replace(/ó|ò|ô|ö/g, 'o')
        .replace(/ú|ù|ü|û/g, 'u')
        .replace(/ñ/g, 'n')
        .replace(/"|'/g, '')
      : value
  });
  createBlog = async e => {
    this.setState({
      isLoad: true
    });

    e.preventDefault();

    try {
      const {
        title,
        description,
        subdomain
      } = this.state;
      
      const ownerEmail = localStorage.getItem('userEmail');

      await createBlog({
        subdomain,
        title,
        description,
        ownerEmail
      });

      this.setState({
        isLoad: false
      });

      localStorage.removeItem('userEmail');
      localStorage.removeItem('_step');
      localStorage.removeItem('userToken');

      Router.push('/login');
    } catch(err) {
      alert('Error Creating Blog');
      throw err;
    }
  }
  render() {
    const {isLoad, subdomain, title, description} = this.state;

    return <form className='form' onSubmit={this.createBlog}>
        <div id='direction'>
          <Input
            disabled={isLoad}
            id='subdomain'
            value={subdomain}
            onChange={this.handleInput}
            label='Dirección'
          /><div>
            <span>.lettercms.vercel.app</span>
          </div>
        </div>
        <Input
          disabled={isLoad}
          id='title'
          value={title}
          onChange={this.handleInput}
          label='Título del Blog'
        />
        <Input
          disabled={isLoad}
          id='description'
          type='textarea'
          value={description}
          onChange={this.handleInput}
          label='Descripción'
        />
        {
          isLoad
            ? <div style={{width: '2.75rem', height: '2.75rem', position: 'relative', margin: 'auto'}}>
              
              <Image layout='fill'
                src={`${process.env.ASSETS_BASE}/assets/spinner-black.svg`} 
                alt='Spinner'
                style={{
                  display: 'block', height: '2.75rem', margin: '15px auto', animation: 'rotation linear 1s infinite',
                }}
              />
            </div>
          :
          <button className="black">Crear Blog</button>
        }
        <style jsx>{`
          #direction {
            display: flex;
          }
          #direction div {
            border: 1px solid #c4d8dc;
            border-left: none;
            margin-bottom: 1.25rem;
            border-radius: 0 .25rem .25rem 0;
            font: 400 0.875rem/1.875rem "Open Sans", sans-serif;
            display: flex;
            align-items: center;
            padding-right: 1.25rem;
          }
          :global(#direction .form-group) {
            flex-grow: 1;
          }
          :global(#subdomain) {
            border-radius: .25rem 0 0 .25rem;
          }
        `}</style>
    </form>;
  }
}