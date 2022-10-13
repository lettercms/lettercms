import { Component } from 'react';
import sdk from '@lettercms/sdk';
import CardLoad from './baseLoad';

const Load = () => {
  return <div style={{display: 'flex', flexWrap: 'wrap'}}>
    <CardLoad rows={2}/>
    <CardLoad rows={2}/>
    <CardLoad rows={3}/>
    <CardLoad rows={3}/>
    <CardLoad rows={3}/>
  </div>;
};

let Dashboard = () => <Load/>;
let NoData = () => <Load/>;

export default class Stats extends Component {
  constructor() {
    super();

    this.state = {
      haveData: false,
      general: {},
      mostView: {},
      mostCommented: {},
      viewsPosts: [],
      commentsPosts: [],
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetchStatsData = this.fetchStatsData.bind(this);
  }

  componentDidMount() {
    setTimeout(async () => {
      const haveData = await this.fetchStatsData();
      
      if (haveData){
        let mod = await import('./dashboard');
        Dashboard = mod.default;
      }
      else {
        let mod = await import('./noData');
        NoData = mod.default;
      }

      this.setState({
        haveData
      });
    }, 1000);
  }


  async fetchStatsData() {
    try {
      const data = await sdk.stats.all([
        'data.referrers',
        'data.views',
        'data.os',
        'data.browsers',
        'data.countries',
        'data.days',
        'data.dates',
        'data.hours',
        'general.totalViews',
        'general.bounces',
        'general.bounceRate',
        'general.totalComments',
        'general.subscriptors',
        'general.mostViewed',
        'general.subdomain',
        'general.mostCommented'
      ]);

      if (data.general.totalViews === 0 && data.general.totalComments === 0)
        return Promise.resolve(false);

      this.setState(data);

      return Promise.resolve(true);
    } catch (err) {
      alert('Error al Obtener los Datos');
      throw err;
    }
  }
  reload = async start => {
    const data = await sdk.stats.all({
      start,
      fields: [
        'data.referrers',
        'data.views',
        'data.os',
        'data.browsers',
        'data.countries',
        'data.days',
        'data.dates',
        'data.hours',
        'general.totalViews',
        'general.bounces',
        'general.bounceRate',
        'general.totalComments',
        'general.subscriptors',
        'general.mostViewed',
        'general.subdomain',
        'general.mostCommented'
      ]
    });

    this.setState(data);
  }

  render() {
    const {haveData} = this.state;

    return (
      <div>
        {
          haveData
          ? <Dashboard {...this.state} onChange={this.reload}/>
          : <NoData/>
        }
        <style jsx>{`
          :global(#content > div) {
            width: 100%;
          }
          :global(#content > div > div) {
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}
