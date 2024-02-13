import {Component} from 'react'; 
import Base from './base';
import GeneralPanel from './general';

export default class RealtimeCard extends Component {
  
  render() {
    const {general, growth} = this.props;

    return <div>
      <Base rows={2} title='Vistas Totales' principal>
        <GeneralPanel value={general.totalViews} growth={growth}/>
      </Base>
      <style jsx>{`
        #stats-dashboard {
          display: flex;
          flex-wrap: wrap;
          position: relative;  
        }
      `}</style>
    </div>;
  }
}
