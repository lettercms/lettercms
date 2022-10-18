import BaseLoad from '../../stats/baseLoad';

const AccountLoad = () => <div className='flex flex-column config-opts'>
  <div className='account-load' id='account-circle'/>
  <BaseLoad rows={1}/>
  <style jsx>{`
    #account-circle {
      background: #ccd7ec;
      animation: bounce infinite 2s ease-in;
      width: 250px;
      height: 250px;
      border-radius: 50%;
    }
    @keyframes bounce {
      0% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
      100% {
        opacity: 1;
      }
    }
  `}</style>
</div>;

export default AccountLoad;
