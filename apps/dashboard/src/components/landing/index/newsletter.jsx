import {FormattedMessage} from 'react-intl';
import Link from 'next/link';
import {useState} from 'react';
import Input from '@/components/input';
import * as admin from '@lettercms/admin';
import Button from '@/components/button';
import Container from '@/components/container';


export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return <div className="py-8">
      <Container className='bg-white m-auto max-w-2xl'>
        <div className='text-center'>
          <div className="font-bold text-xl text-main-700 mb-4">
            <FormattedMessage id='NEWS'/>
          </div>
          <h2>
            <FormattedMessage id='Stay tuned of the new things we bring to you'/>
          </h2>
          <form id="newsletterForm"  data-toggle="validator" data-focus="false">
            <div className='mt-12 mb-4 w-4/5 mx-auto'>
              <Input
                disabled={isLoading}
                value={email}
                id='subemail'
                type='email'
                onInput={({target: {value}}) => setEmail(value)}
                label='Email'
              />
            </div>
            <div className="checkbox">
              <input type="checkbox" id="nterms" value="Agreed-to-Terms" required/>
              <span>      
                <FormattedMessage id={'I\'ve read and accept the '}/>
                <Link href='/privacy'>
                  <a>
                    <FormattedMessage id='Privacy policies'/>
                  </a>
                </Link>
                <FormattedMessage id=' and the '/>
                <Link href='/conditions'>
                  <a>
                    <FormattedMessage id='Terms and Conditions'/>
                  </a>
                </Link>
                <FormattedMessage id=' of LetterCMS'/>
              </span>
            </div>
            <Button type='solid' className='mt-12'>
              <FormattedMessage id='SUBSCRIBE'/>
            </Button>
          </form>
        </div> 
      
        <div className="icon-container">
          <span className="fa-stack">
            <a href="https://www.facebook.com/davidsdevel">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-facebook-f fa-stack-1x"></i>
            </a>
          </span>
          <span className="fa-stack">
            <a href="https://www.twitter.com/davidsdevel">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-twitter fa-stack-1x"></i>
            </a>
          </span>
          <span className="fa-stack">
            <a href="#your-link">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-pinterest-p fa-stack-1x"></i>
            </a>
          </span>
          <span className="fa-stack">
            <a href="https://www.instagram.com/davidsdevel">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-instagram fa-stack-1x"></i>
            </a>
          </span>
          <span className="fa-stack">
            <a href="https://www.linkedin.com/in/davidsdevel">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-linkedin-in fa-stack-1x"></i>
            </a>
          </span>
        </div> 
      </Container>
    </div>;
  }
