import { useState } from 'react';
import Invitation from './invitationModal';
import Collab from './collab';
import Layout from '../listLayout';

export default function Accounts() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [collabId, setCollabId] = useState(null);

  return <div style={{ width: '100%' }}>
    <Layout
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
      onEdit={setCollabId}
      onCreate={() => setShowInvitation(true)}
      buttonText='Invitar'
    />

    {
      !!collabId &&
      <Collab id={collabId} onClose={() => setCollabId(null)}/>
    }
    {
      showInvitation &&
      <Invitation onClose={() => setShowInvitation(false)}/>
    }
        
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
    `}</style>
  </div>;
}
