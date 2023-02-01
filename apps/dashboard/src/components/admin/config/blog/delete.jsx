import {useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import Modal from '@/components/modalBase';
import Input from '@/components/input';
import Button from '@/components/button';

  const DeleteBlog = () => {
    const [show, toggleModal] = useState(false);
    const [password, setPaswword] = useState('');
    const intl = useIntl();

    return <div>
      <div>
        <Button type='solid' style={{width: '100%'}} onClick={() => toggleModal(true)}>
          <FormattedMessage id='Delete'/>
        </Button>
      </div>
      <Modal show={show} close={() => toggleModal(false)} height='max-content' width='max-content'>
        <div>
          <FormattedMessage id='Are you sure you want to delete your blog and your associated data? This action cannot be reversed'/>
        </div>
        <hr/>
        <div>
          <FormattedMessage id='To confirm this action write your password'/>
        </div>
        <Input id='password' value={password} onInput={({target:{value}}) => setPaswword(value)} label={intl.formatMessage({id: 'Password'})}/>
        <Button type='solid'>
          <FormattedMessage id='Delete'/>
        </Button>
      </Modal>
      <style>{`
        ul#modal {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
        }
        ul#modal li {
          margin: 0 15px;
        }
        ul#modal li img {
          width: 75px;
          cursor: pointer;
        }
      `}</style>
    </div>;
  };

export default DeleteBlog;
