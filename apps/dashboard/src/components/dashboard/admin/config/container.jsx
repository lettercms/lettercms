const Container = ({children}) => <div className='config-container'>
  {children}
  <style jsx>{`
    .config-container {
      border: 1px solid #a1a1a1;
      background: white;
      padding: 3rem 6rem;
      border-radius: 10px;
      margin: 2rem 0;
      width: 100%;
    }
  `}</style>
</div>;

export default Container;
