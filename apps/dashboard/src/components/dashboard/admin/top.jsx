import Button from '@/components/button';

export default function Top(props) {
    const {create, loading, buttonText, disabled} = props;

    return <div className='top-static'>
      <div className='top-fixed'>
        <div className="top">
          <Button type='outline' style={{width: 'max-content'}} alt onClick={create} disabled={loading || disabled}>{buttonText || 'Create'}</Button>
          <div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .selector-button {
          border: #fff 1px solid;
          background-color: #fff;
          color: #1282a2;
        }
        .selector-button:enabled:hover,
        .button-focus{
          border-color: #f3f7fd;
          background-color: transparent;
          color: #fff !important;
        }
        .button-focus {
          cursor: default !important;
        }
        @keyframes loading {
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
      <style jsx>{`
        .top-fixed {
          z-index: 1;
          width: 85%;
          left: 15%;
          position: fixed;
          top: 0;
        }
        .top {
          display: flex;
          background: #5f4dee;
          color: white;
          align-items: center;
          justify-content: space-between;
          padding: 15px 5%;
        }
        .top div {
          display: flex;
          justify-content: flex-end;
          flex-grow: 1;
        }
        :global(.top div > span) {
          background: #fff;
          padding: 7.5px 15px;
          border-radius: 50px;
          min-height: 19px;
        }
        .top button {
          position: relative !important;
          left: 0 !important;
          width: 150px !important;
        }
        @media (max-width: 480px) {
          .top-fixed {
            width: 100% !important;
            left: 0 !important;
          }
        }
      `}</style>
    </div>;
  }