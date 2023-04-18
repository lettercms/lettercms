import Input from '@/components/input';

const inputs = [
  {
    id: 'posts',
    label: 'Posts'
  },
  {
    id: 'pages',
    label: 'Pages'
  },
  {
    id: 'stats',
    label: 'Stats'
  },
  {
    id: 'social',
    label: 'Social'
  },
  {
    id: 'email',
    label: 'Email'
  },
  {
    id: 'config',
    label: 'Config'
  },
  {
    id: 'accounts',
    label: 'Accounts'
  }
];

const ModalPermissions = ({onChange}) => <div id='permission-modal'>
  {
    inputs.map(e => <div className="selection" key={e.id}>
        <input type="checkbox" onChange={onChange} name="permission" id={e.id} />
        <label htmlFor={e.id} className="option">{e.label}</label>
      </div>)
  }
  <br/>
  <style jsx>{`
    div#permission-modal {
      width: 100%;
      padding: 0;
    }
    :global(.selection) {
      width: 15rem;
    }
  `}</style>
</div>;

export default ModalPermissions;
