import HandleDate from '@/lib/handleDate';
import Like from '@/components/svg/like';
import Bubbles from '@/components/svg/bubbles';
import Share from '@/components/svg/share';
import Website from '@/components/svg/website';
import AngleDown from '@/components/svg/angleDown';
import EllipsisH from '@/components/svg/ellipsisH';

const FacebookCard = ({ content, pageName, pageImage, created, images}) =>
  <div className="card">
    <div id="head">
      <div id="photo">
        <img alt='' width='50' height='50' src={`${pageImage}?width=50`} style={{ border: 'solid 1px rgba(0,0,0,.1)', borderRadius: '50%', margin: '-5px 5px 0' }} />
      </div>
      <div id="name">
        <div>
          <div>
            <span>
              <h2>{pageName}</h2>
            </span>
          </div>
        <div>
          <span>{HandleDate.getGMTDate(created)}</span>
          <span> . </span>
          <span>
            <Website height='18'/>
          </span>
        </div>
      </div>
    </div>
    <div id="points">
      <div style={{
        width: 20,
        alignSelf: 'flex-start',
        height: 20 
      }}>
        <EllipsisH width='20'/>
      </div>
    </div>
  </div>
  <div id="body">
    <span>{content}</span>
  </div>
  {
    images.length > 0 &&
    <div id='image'>
      <img src={images[0]} alt=''/>
    </div>
  }
  <div id="buttons">
    <div>
      <div>
        <div>
          <Like height='18'/>
        </div>
        Me Gusta
      </div>
      <div className="comment">
        <div>
          <Bubbles height='18'/>
        </div>
        Comentar
      </div>
      <div>
        <div>
          <Share height='18'/>
        </div>
        Compartir
      </div>
      <button>
        <img alt='Asset' style={{ borderRadius: '50%', margin: '0 5px 0 0' }} height={20} src={`${pageImage}?width=20`} width={20} />
        <AngleDown width='12'/>
      </button>
    </div>
  </div>
  <style jsx>{`
      .card {
        width: 100%;
        margin: 16px auto;
        max-width: 500px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgba(0,0,0,.2);
        font-family: Helvetica, Arial, sans-serif;
      }
      .card h2 {
        line-height: 1;
      }
      #head {
        padding: 12px 16px;
        display: flex;
        align-items: flex-start;
        flex-direction: row;
      }
      #head #name {
        flex-grow: 1;
        margin: -5px 0;
      }
      #head #name + div {
        flex-direction: column;
        display: flex;
      }
      #head #name span {
        word-break: break-word;
        word-wrap: break-word;
        line-height: 1.2308;
        font-size: .8125rem;
        color: #65676b;
      }
      #head #name span h2 {
        font-weight: 600;
        color: #050505;
        font-size: .9375rem;
        margin: 4px 0 0 0;
      }
      .image-gray {
        filter: invert(39%) sepia(21%) saturate(200%) saturate(109.5%) hue-rotate(174deg) brightness(94%) contrast(86%);
      }
      #body {
        padding: 0 16px 12px;
        color: #050505;
        font-size: 1${images.length === 0 ? '.5' : ''}rem;
        line-height: 1.1667;
        font-weight: 400;
      }
      #body span {
        word-wrap: break-word;
      }
      #image img {
        width: 100%;
      }
      #buttons {
        overflow-y: hidden;
      }
      #buttons > div {
        margin: 0 16px;
        display: flex;
        padding: 4px 0;
        flex-direction: row;
        align-items: center;
        border-top: solid 1px rgba(0,0,0,.3);
      }
      #buttons > div > div {
        display: flex;
        align-items: center;
        flex: 1 0;
        justify-content: center;
        font-size: .9375rem;
        color: #606770;
        font-weight: 600;
        height: 32px;
          line-height: 14px;
        padding: 0 2px;
        position: relative;
        text-decoration: none;
        flex-grow: 1;
      }
      #buttons > div > div::after {
        bottom: -5px;
        content: '';
        display: block;
        left: 0;
        position: absolute;
        right: 0;
        top: -5px;
      }
      #buttons > div > div.comment::before {
        background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/v3/yT/r/czFSwTlzliV.png);
        background-repeat: no-repeat;
        background-size: auto;
        background-position: -350px -1354px;
        content: '';
        display: inline-block;
        height: 18px;
        margin: 0 6px -3px 0;
        min-width: 18px;
        position: relative;
        top: -2px;
        width: 18px;
      }
      #buttons > div > button {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: default;
        padding: 0 8px;
        height: 32px;
        border: none;
        background: transparent;
        width: fit-content !important;
      }
      #buttons > div > div > div {
        vertical-align: middle;
        padding-right: 6px;
      }
    `}
  </style>
</div>;

export default FacebookCard;
