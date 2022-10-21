import {Component} from 'react';
import sdk from '@lettercms/sdk';
import ModalUser from './modalUser';

class InvitationModal extends Component {
  constructor() {
    super();
    this.state = {
      permissions: [],
      role: 'collaborator',
      email: '',
      name: '',
      lastname: '',
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
      const {role, permissions, email, name, lastname} = this.state;

      if (!email || !name || !lastname)
        return alert('Ingresa los datos');

      if (role === 'admin')
        await sdk.accounts.inviteAdmin(email);
      else if (role === 'collaborator') 
        await sdk.createRequest('/account/invitation', 'POST', {email, name, lastname});
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
    const {role, step, email, name, lastname} = this.state;

    return <div>
      <ModalUser onChange={this.handleInput} role={role} name={name} lastname={lastname} email={email}/>
      <button className='black' onClick={this.sendInvitation}>Enviar Invitacion</button>
    </div>; 
  }
}

export default InvitationModal;
