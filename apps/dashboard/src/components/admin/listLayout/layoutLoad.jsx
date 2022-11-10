import CardLoad from './cardLoad';

const LayoutLoad = ({tab}) => <div>
  <div className='layout' style={{height: 76.5, top: 0, background: '#5f4dee'}}/>
  <div className='layout' style={tab ? {height: 46, top: 76.5, background: '#1282a2'} : null}/>
  <div style={{height:130}}/>
  <CardLoad/>
  <style jsx>{`
    div.layout {
      width: 100%;
      position:absolute;
      right: 0;
    }
  `}</style>
</div>;

export default LayoutLoad;
