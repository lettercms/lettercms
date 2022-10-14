import { Component } from 'react';
import Load from '../../logoLoad';
import dynamic from 'next/dynamic';
import Card from './card';
import Top from '../top';
import CardLoad from '../cardLoad';
import sdk from '@lettercms/sdk';
import Base from '../../modalBase';
import Invitation from './modal';
import LayoutLoad from '../listLayout/layoutLoad';

const Details = dynamic(() => import('./details'), {
  loading: () => <Load/>,
  ssr: false
});

const Layout = dynamic(() => import('../listLayout'), {
  loading: () => <LayoutLoad tab={true}/>,
  ssr: false
});

class Accounts extends Component {
  constructor() {
    super();
    this.state = {
      accounts: [],
      invitations: [],
      tab: 'collaborators',
      loading: true,
      showModal: false,
      editting: false
    };

    this.accounts = [];
  }

  componentDidMount = () => setTimeout(this.fetchAccounts, 100);

  fetchAccounts = async () => {
    try {
      const count = {};

      const {data: accounts} = await sdk.accounts.collaborators([
        'photo',
        'name',
        'lastname',
        'role',
        'ocupation'
      ]);

      accounts.forEach(e => count[e.role] = count[e.role] + 1 || 1);

      this.setState({
        accounts,
        count,
        loading: false,
      });
    } catch (err) {
      throw err;
    }
  }

  fetchInvitations = async () => {
    try {
      //TODO: Change to sdk.invitation.all method;
      const {data: invitations} = await sdk.createRequest('/account/invitation');

      this.setState({
        loading: false,
        invitations
      });
    } catch(err) {
      throw err;
    }
  }

  showDetails = async (id) => {
    try {

      const user = await sdk.accounts.single(id, [
        'name',
        'lastname',
        'ocupation',
        'description',
        'photo',
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'email'
      ]);

      this.setState({
        showModal: true,
        modal: 'details',
        user
      });
    } catch(err) {
      alert('Error al obtener datos del usuario');
      throw err;
    }
  }

  showModal = _ => {
    this.setState({showModal: true, modal: 'invite'});
  }
  closeModal = () => {
    this.setState({showModal: false, modal: ''});
  }

  filter = accounts => this.setState({
    accounts
  });
  changeTab = tab => {
    this.setState({
      loading: true,
      tab
    });

    if (tab === 'collaborators')
      this.fetchAccounts();
    if (tab === 'invitations')
      this.fetchInvitations();
  }

  edit = ID => this.setState({ editting: true});
  delete = ID => {
    if (confirm('are you sure to delete this account?'))
      sdk.accounts.delete(ID);
  }

  render() {
    const {accounts, editting, count, loading, showModal, tab, invitations} = this.state;

    let ui;

    if (loading) {
      ui = <CardLoad/>;
    } else if (tab === 'collaborators') {
      ui = <Layout
        picture='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/accounts.svg'
        type='accounts'
        fields={[
          'photo',
          'name',
          'lastname',
          'role',
          'ocupation'
        ]}
        tabs={[
          {name: 'single', alias: 'Unicos'},
          {name: 'collaborator', alias: 'Colaboradores'}
        ]}
        onEdit={this.showDetails}
        onCreate={() => {
          this.setState({
            showModal: true,
            modal: 'invitations'
          });
        }}
        buttonText='Invitar'
      />;
    } else if (tab === 'invitations') {
      ui = <Layout
        picture='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/invitations.svg'
        type='accounts'
        fields={[
          'photo',
          'name',
          'lastname',
          'role',
          'ocupation'
        ]}
        tabs={[
          {name: 'single', alias: 'Unicos'},
          {name: 'collaborator', alias: 'Colaboradores'}
        ]}
        onEdit={this.showDetails}
        onCreate={this.newPost}
        buttonText='Invitar'
      />;
    }

    return (
      <div style={{ width: '100%' }}>
        {ui}
        <Base show={showModal} close={this.closeModal} width='auto' height='auto'>
          {

            this.state.modal === 'details' &&
            <Details {...this.state.user}/>
          }
          {
            this.state.modal === 'invitations' &&
            <Invitation close={this.closeModal}/>
          }
        </Base>
        <style jsx>{`
        :global(#subscription-main) {
          width: 400px;
        }
        .top div {
          flex-grow: 1;
          padding: 0 0 0 50px;
        }
        .top div span {
          margin: 0 15px;
        }
        button.black {
          position: relative;
          top: 0;
        }
      `}
        </style>
      </div>
    );
  }
}
export default Accounts;
