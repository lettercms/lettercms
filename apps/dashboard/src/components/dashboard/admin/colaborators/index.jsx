import {useIntl} from 'react-intl';
import {useState} from 'react';
import Invitation from './invitationModal';
import Collab from './collab';
import Layout from '../listLayout';
import Ico from '@/components/dashboard/assets/adminCollabs';

export default function Accounts() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [collabId, setCollabId] = useState(null);

  const intl = useIntl();

  return <div style={{ width: '100%' }}>
    <Layout
      type='accounts'
      fields={[
        'photo',
        'name',
        'lastname',
        'role',
        'ocupation'
      ]}/*
      tabs={[
        {name: 'single', alias: intl.formatMessage({id: 'Singles'})},
        {name: 'collaborator', alias: intl.formatMessage({id: 'Collaborators'})}
      ]}*/
      onEdit={setCollabId}
      onCreate={() => setShowInvitation(true)}
      buttonText={
        intl.formatMessage({
          id: 'Invite'
        })
      }
      ico={<Ico/>}
      topText={
        intl.formatMessage({
          id: 'Collaborators'
        })
      }
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
