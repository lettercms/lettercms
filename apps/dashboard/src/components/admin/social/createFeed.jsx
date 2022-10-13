import {Component} from 'react';

class CreateFeed extends Component {
  state = {
    message: '',
    image: null
  };

  handleInput = ({target: {name, value}}) => this.setState({
    [name]: value
  });

  render() {
    const {feed, Card, back} = this.props;
    const {message} = this.state;

    return <div className='social-feed'>
      <div className='social-input'>
        <img alt='asset' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/arrow-white.svg' onClick={back} className='back'/>
        <textarea type='text' name='message' onInput={this.handleInput}/>
        <button className='white'>Publish</button>
        <div className='social-schedule'>
          <span>No hay publicaciones programadas</span>
        </div>
      </div>
      <div className='social-posts'>
        {
          message && 
          <Card content={message}/>
        }
        {
          feed.map((e, i) => {
            const content = e.caption || e.message || e.text;
            const created = e.created_time || e.created_at || e.timestamp;
            const image = e.media_url;

            return <Card key={`card-${i}`} content={content} created={created} image={image}/>;
          })
        }
      </div>
      <style jsx>{`
        :global(#content) {
          width: calc(100% - 60px) !important;
          padding: 0 !important;
        }
        .social-feed > div {
          position: absolute;
          display: inline-block;
          padding: 0 5%;
        }
        .social-feed div.social-input {
          width: 30%;
          left: 0;
          height: 100%;
          background: #333;
          position: fixed;
          left: 60px;
        }
        .social-feed div.social-input button {
          margin: 10px auto;
        }
        .social-feed div.social-input .social-schedule {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 25px 0;
          min-height: 350px;
          color: white;
        }
        .social-feed div.social-posts {
          width: 50%;
          right: 0;
          height: 100%;
        }
        .social-feed div img.back {
          transform: rotate(90deg);
          cursor: pointer;
          margin: 10px 0 25px;
        }
      `}</style>
    </div>;
  }
}

export default CreateFeed;
