'use client'

import {useState} from 'react';
import {createBlog} from '@lettercms/admin';
import Router from 'next/navigation';
import Input from '@/components/input';
import Button from '@/components/button';
import sdk from '@lettercms/sdk';
import {useData} from '@/components/dashboard/credentialsContainer';
import sanitize from '@/lib/sanitizeUrl';

export default function BlogTab({translation}) {
  const [existsSubdomain, setExistsSubdomain] = useState(null);
  const [description, setDescription] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [title, setTitle] = useState('');

  const {user} = useData();

  const handleInput = ({target: {name, value}}) => {
    switch(name) {
      case 'subdomain':
        return setSubdomain(sanitize(value));
      case 'description':
        return setDescription(value);
      case 'title':
        return setTitle(value);
      default:
        break;
    }
  };

  const checkSubdomain = async e => {
    const {target: {value}} = e;

    setExistsSubdomain(null);

    handleInput(e);

    const exists = await sdk.Letter.existsSubdomain(value);

    setExistsSubdomain(exists);
  };

  const hadleCreateBlog = async e => {
    e.preventDefault();
    
    if (existsSubdomain)
      return;

    if (!subdomain || !title || !description)
      return alert(translation['Please fill all the fields']);

    setIsLoad(true);

    try {      
      const ownerEmail = user.email || localStorage.getItem('_email');

      await createBlog({
        subdomain,
        title,
        description,
        ownerEmail
      });

      localStorage.removeItem('_step');
      localStorage.removeItem('_email');

      Router.push('/login');
    } catch(err) {
      alert(translation['Error creating the blog']);

      throw err;
    } finally {
      setIsLoad(false);
    }
  };

  let subdomainStatus = '';

  if (existsSubdomain === true)
    subdomainStatus = 'invalid';
  else if (existsSubdomain === false)
    subdomainStatus = 'valid' ;
  else
    subdomainStatus = 'loading';

  return <form className='form' onSubmit={hadleCreateBlog}>
    <div id='direction'>
      <Input
        status={subdomainStatus}
        disabled={isLoad}
        id='subdomain'
        value={subdomain}
        onChange={checkSubdomain}
        label={
          intl.formatMessage({
            id: 'Address'
          })
        }
      />
      <div className='py-2'>
        <span>.lettercms.vercel.app</span>
      </div>
    </div>
    {
      existsSubdomain === true &&
      <div className='text-center pt-1 pb-4'>
        <span>
          {translation['A blog with that subdomain already exists']}
        </span>
      </div>
    }
    <Input
      disabled={isLoad}
      id='title'
      value={title}
      onChange={handleInput}
      label={translation['Blog\'s title']}
    />
    <Input
      disabled={isLoad}
      id='description'
      type='textarea'
      value={description}
      onChange={handleInput}
      label={translation['Description']}
    />
    <Button type='solid' style={{width: '100%'}}  loading={isLoad} disabled={existsSubdomain}>
      {translation['Register']}
    </Button>
    <style jsx>{`
      #direction {
        display: flex;
      }
      #direction div {
        border: 1px solid #c4d8dc;
        border-left: none;
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
