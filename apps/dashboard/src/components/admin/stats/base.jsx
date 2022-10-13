const Base = ({children, rows = 1, title, style, principal}) => <div className={`${principal ? 'principal ' : ''}chart-container`} style={style}>
  <span className='baseTitle'>{title}</span>
  {children}
  <style jsx>{`
    .principal {
      background: linear-gradient(to right, #5f4dee, #03a9f4) !important;
    }
    :global(.principal span) {
      color: white !important;
    }
    .chart-container {
      background: white;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 15px;
      width: calc(${(typeof rows !== 'number' ? rows : 100 / rows)}% - 50px);
      height: 250px;
      background: white;
      margin: 15px 25px;
      padding: 50px 0;
    }
    :global(.chart-container span.general-growth),
    .chart-container span {
      color: #03a9f4;
    }
    :global(.chart-container span.general-value) {
      color: #444444;
    }
    .baseTitle {
      position: absolute;
      top: 15px;
      left: 5%;
    }
  `}</style>
</div>;

export default Base;
