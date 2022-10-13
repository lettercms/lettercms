import {Component} from 'react';
import sdk from '@lettercms/sdk';
import ModalUser from './modalUser';

class InvitationModal extends Component {
  constructor() {
    super();
    this.state = {
      permissions: [],
      role: 'admin',
      email: '',
      step: 1
    };
  }
  handleInput = ({target}) => {
    const {name, value, type, checked} = target;

    if (type === 'checkbox') {
      let {permissions} = this.state;

      if (checked)
        permissions.push(name);
      else
        permissions = permissions.filter(e => e !== name);

      this.setState({
        permissions
      });

    } else
      this.setState({
        [name]: value
      });
  }
  sendInvitation = async _ => {
    try {
      const {role, permissions, email} = this.state;

      if (!email)
        return alert('Coloca un Email');

      if (role === 'admin')
        await sdk.accounts.inviteAdmin(email);
      else if (role === 'collaborator') 
        await sdk.createRequest('/account/invitation', 'POST', {email});
      else if (role === 'single')
        await sdk.accounts.inviteSingle(email);

      alert('Invitacion Enviada');

      this.props.close();
    } catch(err) {
      alert('Error enviando invitacion');
      throw err;
    }
  }
  render() {
    const {role, step, email} = this.state;

    return <div>
      <ModalUser onChange={this.handleInput} role={role} email={email}/>
      <button className='black' onClick={this.sendInvitation}>Enviar Invitacion</button>
    </div>; 
  }
}

export default InvitationModal;
