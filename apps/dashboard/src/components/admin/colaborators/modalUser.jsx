import Input from '../../input';

const ModalUser = ({onChange, role, email}) => <div id='user-modal'>
  <Input
    onInput={onChange}
    value={email}
    type='email'
    id='email'
    label='Email'
  />
  <select onInput={onChange} name="role" value={role}>
      <option value='admin'>Administrador</option>
      <option value='collaborator'>Colaborador</option>
      <option value='single'>Unico</option>
  </select>
  <style jsx>{`
    #user-modal select {
      margin: 10px 0;
    }
  `}</style>
</div>;

export default ModalUser;
