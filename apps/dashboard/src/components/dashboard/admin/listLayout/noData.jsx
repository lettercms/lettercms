import {FormattedMessage} from 'react-intl';
import Button from '@/components/button';

const NoData = ({action, /*picture = `${process.env.ASSETS_BASE}/assets/posts.svg`, */buttonText = 'Crear'}) => <div className="center">
  <div className='data-text'>
    <span>
      <FormattedMessage id='Oops, we have nothing here yet'/>
    </span>
  </div>
  <Button type='outline' onClick={action}>{buttonText}</Button>
  <style jsx>{`
    .data-text {
      padding: 5rem 0 7rem;
      text-align: center;
    }
    .data-text span {
      font-size: 2rem;
      color: var(--main-alt);
    }
    .center {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      padding-bottom: 2rem;
    }
  `}</style>
</div>;

export default NoData;
