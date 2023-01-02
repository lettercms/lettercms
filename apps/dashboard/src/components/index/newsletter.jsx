import {Component} from 'react';
import Input from '../input';
import * as admin from '@lettercms/admin';
import Button from '@/components/button';

export default class Newsletter extends Component {
  state = {
    email: '',
    isLoad: false
  }

  handleInput = ({target: {value}}) => this.setState({email: value});

  subscribe = async e => {
    e.preventDefault();

    try {
      //await admin.createSubscritor(this.state.email);
    } catch(err) {
      alert('Error al suscribirse');
      throw err;
    }
  }
  render() {
    const {email, isLoad} = this.state;
    return <div className="form">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-container">
              <div className="above-heading">NOTICIAS</div>
              <h2>Esta al tanto de que traemos nuevo para ti</h2>
              <form id="newsletterForm" onSubmit={this.subscribe} data-toggle="validator" data-focus="false">
                <Input
                  disabled={isLoad}
                  value={email}
                  id='subemail'
                  type='email'
                  onInput={this.handleInput}
                  label='Email'
                />
                <div className="form-group checkbox">
                  <input type="checkbox" id="nterms" value="Agreed-to-Terms" required/>He leido y acepto las <a href="privacy-policy.html">Politicas de privacidad</a> y los <a href="terms-conditions.html">Terminos y Condiciones</a> de LetterCMS
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group">
                  <Button type='solid'>SUBSCRIBIRSE</Button>
                </div>
                <div className="form-message">
                  <div id="nmsgSubmit" className="h3 text-center hidden"/>
                </div>
              </form>
            </div> 
          </div> 
        </div> 
        <div className="row">
          <div className="col-lg-12">
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
          </div> 
        </div> 
      </div> 
      <style jsx>{`
        .form {
          padding-top: 4rem;
          padding-bottom: 6rem;
        }

        .form .text-container {
          margin-bottom: 3.5rem;
          padding: 3.5rem 1rem 2.5rem 1rem;
          border-radius: 0.5rem;
          background-color: #f3f7fd;
        }

        .form h2 {
          margin-bottom: 2.75rem;
          text-align: center;
        }

        .form .icon-container {
          text-align: center;
        }

        .form .fa-stack {
          width: 2em;
          margin-bottom: 0.75rem;
          margin-right: 0.375rem;
          font-size: 1.5rem;
        }

        .form .fa-stack .fa-stack-1x {
            color: #fff;
          transition: all 0.2s ease;
        }

        .form .fa-stack .fa-stack-2x {
          color: #5f4dee;
          transition: all 0.2s ease;
        }

        .form .fa-stack:hover .fa-stack-1x {
          color: #5f4dee;
        }

        .form .fa-stack:hover .fa-stack-2x {
            color: #f3f7fd;
        }


        @media (min-width: 768px) {
          
          .form .text-container {
            padding: 4rem 2.5rem 3rem 2.5rem;
          }

          .form form {
            margin-right: 4rem;
            margin-left: 4rem;
          }
          
        }

        @media (min-width: 992px) {
          
          .form .text-container {
            width: 55rem;
            margin-right: auto;
            margin-left: auto;
            padding-top: 5rem;
            padding-bottom: 4.5rem;
          }

          .form h2 {
            margin-right: 7rem;
            margin-left: 7rem;
          }

          .form form {
            margin-right: 9rem;
            margin-left: 9rem;
          }
        }

        @media (min-width: 1200px) {
          .form .text-container {
            width: 64.75rem;
            padding-top: 6rem;
            padding-bottom: 5.5rem;
          }

          .form h2 {
            margin-right: 12rem;
            margin-left: 12rem;
          }

          .form form {
            margin-right: 15rem;
            margin-left: 15rem;
          }
        }

      `}</style>
    </div>;
  }
}
