import Image from 'next/image';

const LoadMore = ({onClick, isLoading}) => <div className='load-more-spinner'>
  {
    isLoading
      ? <Image src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/spinner-black.svg' alt='Spinner' width='50' height='50' style={{animation: 'rotation 1s infinite linear'}}/>
      : <button onClick={onClick} className='btn-outline-sm'>Cargar Mas</button>
  }  
  <style jsx>{`
    .load-more-spinner {
      width: 100%;
      justify-content: center;
      display: flex;
    }
    button {
      width: 300px;
      margin-bottom: 1rem;
    }
  `}</style>
</div>;

export default LoadMore;
