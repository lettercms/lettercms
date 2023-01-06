import {FormattedMessage} from 'react-intl';
import Link from 'next/link';

const Tags = ({tags}) => {
  return <div id='tags-container'>
    <span><FormattedMessage id='Tags'/>:</span>
    <ul>
      {tags.map(e => <li key={e}><Link href={`/blog/search?q=${e}`}><a>{e}</a></Link></li>)}
    </ul>
    <style jsx>{`
      #tags-container {
        margin-left: 5%;
      }
      #tags-container span {
        font-weight: bold;
        color: #777;
        font-size: .9rem;
      }
      #tags-container ul {
        list-style: none;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      #tags-container ul li {
        border: solid 1px #03a9f4;
        border-radius: 50px;
        padding: .25rem 1rem;
        margin: 0 .25rem;
        transition: ease .3s;
      }
      #tags-container ul li:hover {
        background: #03a9f4;
      }
      #tags-container ul li:hover a {
        text-decoration: none;
        color: #fff !important;
      }
      @media screen and (min-width: 1024px) {
        #tags-container {
          margin-left: 10%;
        }
      }
    `}</style>
  </div>;
};

export default Tags;
