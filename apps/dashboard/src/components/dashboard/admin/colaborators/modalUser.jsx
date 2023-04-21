import {useIntl} from 'react-intl';
import Input from '@/components/input';

export default function ModalUser({onChange, email, name, lastname}) {
  const intl = useIntl();

  return <div id='user-modal'>
    <Input
      onInput={onChange}
      value={name}
      id='name'
      label={
        intl.formatMessage({
          id: 'Name'
        })
      }
    />
    <Input
      onInput={onChange}
      value={lastname}
      id='lastname'
      label={
        intl.formatMessage({
          id: 'Lastname'
        })
      }
    />
    <Input
      onInput={onChange}
      value={email}
      type='email'
      id='email'
      label={
        intl.formatMessage({
          id: 'Email'
        })
      }
    />
    {/*
      <select onInput={onChange} name="role" value={role}>
          <option value='admin'>Administrador</option>
          <option value='collaborator'>Colaborador</option>
          <option value='single'>Unico</option>
      </select>*/}
    <style jsx>{`
      #user-modal select {
        margin: 10px 0;
      }
    `}</style>
  </div>;
}
