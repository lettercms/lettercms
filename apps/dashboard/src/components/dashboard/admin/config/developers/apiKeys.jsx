import {useState, useEffect} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import Container from '../../stats/base';
import Modal from '@/components/modal';
import Input from '@/components/input';
import List from './keyList';
import {useUser} from '@/components/dashboard/layout';
import sdk from '@lettercms/sdk';
import ListLoad from './listLoad';
import CopyField from '@/components/copyField';
import Button from '@/components/button';

const ApiKey = () => {
  const [show, toggleModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState([]);
  const [keyName, setKeyName] = useState('');
  const [step, setStep] = useState(0);
  const [newKey, setNewKey] = useState('');
  const {status, blog} = useUser();

  const intl = useIntl();

  useEffect(() => {
    if (status === 'done') {
      fetch('/api/blog/api-key', {
        headers: {
          Authorization: sdk.accessToken
        }
      })
        .then(e => e.json())
        .then(e => {
          setKeys(e.data);
          setLoading(false);
        });
    }
  }, [status]);

  const create = async () => {
    try {
      if (!keyName)
        return alert(
          intl.formatMessage({
            id: 'Write a description'
          })
        );

      const res = await fetch('/api/blog/api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: sdk.accessToken
        },
        body: JSON.stringify({
          name: keyName
        })
      });

      if (res.ok) {
        const {status, data} = await res.json();

        if (status === 'OK') {
          setNewKey(data.key);
          setStep(1);
          setKeyName('');
          
          data.created = Date.now();

          setKeys(k => [data].concat(k));
          return;
        } else if (status === 'key-limit') {
          setKeyName('');
          toggleModal(false);

          return alert(
            intl.formatMessage({
              id: 'You only can have 3 keys per blog'
            })
          );
        }
      }

      alert(
        intl.formatMessage({
          id: 'Error creating key'
        })
      );
    } catch(err) {
      alert(
        intl.formatMessage({
          id: 'Error creating key'
        })
      );

      throw err;
    } finally {
      setKeyName('');
    }
  };

  const close = () => {
    toggleModal(false);

    setTimeout(() => {
      setKeyName('');
      setStep(0);
      setNewKey('');
    }, 600);
  };

  const removeKey = id => setKeys(k => k.filter(e => e._id.toString() !== id));

  return <div>
    <Container rows={1} title={intl.formatMessage({id: 'Blog ID'})}>
      <div className='flex flex-column' id='credentials-main' style={{width: '100%'}}>
        <div className='flex flex-row' id='credentials-top'>
          <div>
            <CopyField text={blog?._id}/>
          </div>
          <Button type='solid' onClick={() => toggleModal(true)}>
            <FormattedMessage id='Create new key'/>
          </Button>
        </div>
        <span>
          <FormattedMessage id='API keys'/>
        </span>
        {
          loading
            ? <ListLoad/>
            : <List onDelete={removeKey} apiKeys={keys}/>
        }
      </div>
    </Container>
    <Modal show={show} close={close} height='max-content' width='max-content'>
      {
        step === 0 &&
        <>
          <div>
            <FormattedMessage id='Add a short description'/>
          </div>
          <Input id='keyName' value={keyName} onInput={({target:{value}}) => setKeyName(value)} label={intl.formatMessage({id: 'Key description'})}/>
          <Button type='solid' style={{width: '100%'}} onClick={create}>
            <FormattedMessage id='Create'/>
          </Button>
        </>
      }
      {
        step === 1 &&
        <>
          <span>
            <FormattedMessage id='Be sure to save it. For safety we will not show it again'/>
          </span>
          <CopyField text={newKey}/>
          <Button type='solid' onClick={close}>
            <FormattedMessage id='Close'/>
          </Button>
        </>
      }
    </Modal>
    <style jsx>{`
      #credentials-main {
        align-items: start;
        padding: 0 5%;
      }
      #credentials-main span {
        color: #03a9f4;
        margin-top: 1rem;
      }
      #credentials-top {
        justify-content: space-between;
        width: 100%;
      }
      #credentials-top button {
        width: max-content;
      } 
      @media (max-width: 480px) {
        #credentials-top {
          flex-direction: column !important;
        }
      }
    `}</style>
  </div>;
};

export default ApiKey;
