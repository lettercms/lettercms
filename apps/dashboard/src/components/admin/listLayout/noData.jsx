import Button from '@/components/button';

const NoData = ({action, picture = `${process.env.ASSETS_BASE}/assets/posts.svg`, buttonText = 'Crear'}) => <div className="center">
  <img src={picture} alt='Post icon' />
  <Button type='outline' onClick={action}>{buttonText}</Button>
  <style jsx>{`
    .center {
      width: 100%;
      margin-top: -100px !important;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      justify-content: space-evenly;
    }
    img {
      margin: 50px 0 0 0;
      width: 80% !important;
      max-width: 600px;
    }
    button {
      max-width: 300px;
    }
  `}</style>
</div>;

export default NoData;
