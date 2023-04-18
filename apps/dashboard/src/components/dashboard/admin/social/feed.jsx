import {Component} from 'react';
import sdk from '@lettercms/sdk';
import FacebookCard from './facebookCard';
import InstagramCard from './instagramCard';
import Load from '../../logoLoad';
import SocialFeed from './createFeed';
import asyncImport from '@/lib/asyncImportScript';

const isDev = process.env.NODE_ENV !== 'production';


export default class Feed extends Component {
  state = {
    feed: null,
  };
  componentDidMount = async () => {
    try {
      const {type} = this.props;
      asyncImport(
        'cropper-js',
        isDev
          ? '/editor/cropper.css'
          : 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css',
        'css'
      );
      asyncImport(
        'cropper-css',
        isDev
          ? '/editor/cropper.js'
          : 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js'
      );

      //const {data} = await sdk.createRequest(`/social/${type}`);

      this.setState({
        feed: demo[type]
      });
    } catch(err) {
      alert('Error al obtener las entradas');
      throw err;
    }
  };

  render() {
    const {type} = this.props;
    const {feed} = this.state;

    let Card;

    if (type === 'facebook')
      Card = FacebookCard;
    if (type === 'instagram')
      Card = InstagramCard;

    let UI;

    if (Array.isArray(feed))
      UI = <SocialFeed Card={Card} feed={feed} back={this.props.back}/>;
    else
      UI = <Load/>;

    return <div style={{width: '100%'}}>
      {UI}
    </div>;
  }
}