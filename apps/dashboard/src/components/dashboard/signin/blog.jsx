import {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {createBlog} from '@lettercms/admin';
import Router from 'next/router';
import Input from '@/components/input';
import Button from '@/components/button';
import Image from 'next/image';
import sdk from '@lettercms/sdk';

class BlogTab extends Component {
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
  existsSubdomain = async e => {
    const {target: {name, value}} = e;

    this.setState({
      existsSubdomain: null
    });

    this.handleInput(e);

    const exists = await sdk.Letter.existsSubdomain(value);

    this.setState({
      existsSubdomain: exists
    });
  }
  createBlog = async e => {
    const {
      intl
    } = this.props;

    const {isLoad, subdomain, title, description, existsSubdomain} = this.state;
    
    if (existsSubdomain)
      return;

    if (!subdomain || !title || !description)
      return alert(
        intl.formatMessage({
          id: 'Please fill all the fields'
        })
      );

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
      alert(
        intl.formatMessage({
          id: 'Error creating the blog'
        })
      );
      throw err;
    }
  }
  render() {
    const {intl} = this.props;
    const {isLoad, subdomain, title, description, existsSubdomain} = this.state;

    let subdomainStatus = '';

    if (existsSubdomain === true)
      subdomainStatus = 'invalid';
    else if (existsSubdomain === false)
      subdomainStatus = 'valid' ;
    else
      subdomainStatus = 'loading';

    return <form className='form' onSubmit={this.createBlog}>
      <div id='direction'>
        <Input
          status={subdomainStatus}
          disabled={isLoad}
          id='subdomain'
          value={subdomain}
          onChange={this.existsSubdomain}
          label={
            intl.formatMessage({
              id: 'Address'
            })
          }
        />
        <div>
          <span>.lettercms.vercel.app</span>
        </div>
      </div>
      {
        existsSubdomain === true &&
        <div className='tooltip'>
          <span>
            <FormattedMessage id='A blog with that subdomain already exists'/>
          </span>
        </div>
      }
      <Input
        disabled={isLoad}
        id='title'
        value={title}
        onChange={this.handleInput}
        label={
          intl.formatMessage({
            id: 'Blog\'s title'
          })
        }
      />
      <Input
        disabled={isLoad}
        id='description'
        type='textarea'
        value={description}
        onChange={this.handleInput}
        label={
          intl.formatMessage({
            id: 'Description'
          })
        }
      />
      <Button type='solid' style={{width: '100%'}}  loading={isLoad}>
        <FormattedMessage id='Register'/>
      </Button>
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
        .tooltip {
          margin-top: -1rem;
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </form>;
  }
}

export default injectIntl(BlogTab);
