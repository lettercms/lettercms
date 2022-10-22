import Input from '../../input';

export default function ModalUser({onChange, role, email, name, lastname}) {
  return <div id='user-modal'>
    <Input
      onInput={onChange}
      value={name}
      id='name'
      label='Nombre'
    />
    <Input
      onInput={onChange}
      value={lastname}
      id='lastname'
      label='Apellido'
    />
    <Input
      onInput={onChange}
      value={email}
      type='email'
      id='email'
      label='Email'
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
