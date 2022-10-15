import {Component} from 'react';
import asyncImport from '../../lib/asyncImportScript';
import sdk from '@lettercms/sdk';
import Input from '../input';
import Cookie from 'js-cookie';
import {createAccount, createCollaborator} from '@lettercms/admin';


export default class Verify extends Component {
  state = {
    code: ''
  }
  componentDidMount = async () => {
    /*asyncImport(
      'pusher',
      'https://js.pusher.com/7.1/pusher.min.js'
    ).then(() => {
      window.Pusher.logToConsole = process.env.NODE_ENV !== 'production';

      var pusher = new window.Pusher('9ae451a4e165bf007ec4', {
        cluster: 'us2'
      });

      this.channel = pusher.subscribe(`lettercms-${process.env.NODE_ENV || 'development'}`);

      this.channel.bind('verify', this.verify);
    });*/
  }
  resendEmail = async () => {
    let code = Math.floor(Math.random() * 10000);

      if (code < 1000)
        code = '0' + code;
      else
        code = code.toString();


    const token = Cookie.get('userToken');

    const data = JSON.parse(Buffer.from(token.split('@')[1], 'hex').toString('utf-8'));

    data.code = code;

    try {

    const {status, token} = await createAccount(data);

      if (status === 'OK') {
        alert('Correo enviado');

        const expires = Date.now() + (5 * 60 * 1000);

        Cookie.set('userCode', code, {
          expires
        });
        Cookie.set('userToken', token, {
          expires
        });
      } else {
        alert('Error al reenviar el correo');
      }
    } catch(err) {
      alert('Error al reenviar el correo de verificacion');
      throw err;
    }
  };
  componentWillUnmount = () => {
    /*this.channel.unbind('verify');

    document.getElementById('pusher').remove();

    delete window.Pusher;*/
  }
  verify = async () => {
    /*const {email, status, name} = value;

    const storeEmail = localStorage.getItem('tempUser');

    if (storeEmail !== email)
      return;

    if (status === 'expired') {
      alert('Tiempo de verificacion expirado');
      this.props.onVerifyError();
    } else if (status === 'bad-token') {
      alert('Error al verificar la cuenta');
      this.props.onVerifyError();
    } else if (status === 'verified') {
      alert(`Se verifico que eres tu ${name}`);
      this.props.onVerify();
    }*/

    const email = localStorage.getItem('tempUser');
    const {code} = this.state;
    const _code = Cookie.get('userCode');
    const token = Cookie.get('userToken');

    if (!_code) {
      Cookie.remove('userCode');
      Cookie.remove('userToken');

      return alert('Codigo Expirado');
    }
    if (code !== _code) {
      return alert('Codigo invalido');
    }

    const res = await fetch('/api/account/verify', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token
      })
    });

    const {status} = await res.json();

    if (status === 'OK') {
      this.props.onVerify();
    }

  }

  render() {
    return <div className='form'>
      <span style={{color: '#555', fontSize: '1rem'}}>
        <span>Ingresa el codigo recibido por correo</span>
        <Input id='code' value={this.state.code} onInput={({target: {value}}) => this.setState({code: value})} label='Código de verificación'/>
        <button className='btn-outline-lg' onClick={this.verify}>Verificar</button>
      </span>
      <hr/>
      <button className='btn-outline-lg' onClick={this.resendEmail}>Reenviar Correo</button>
    </div>;
  }
}