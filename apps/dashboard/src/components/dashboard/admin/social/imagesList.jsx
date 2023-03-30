import {FormattedMessage} from 'react-intl';
import sdk from '@lettercms/sdk';
import Cross from '@lettercms/icons/cross';
import {FaPlus} from 'react-icons/fa';
import {useUser} from '@/components/dashboard/layout';

async function deleteImage(url, cb) {
  const name = url.split('/').pop().replace('.webp', '');

  return sdk.createRequest(`/image/${name}`, 'DELETE');
}

const ImageList = ({images, onAdd, onDelete}) => {
  const {blog} = useUser();

  return <div id='images-upload-container'>
    <span>
      <FormattedMessage id='Images'/>
    </span>
    <div id='scrollbar'>
      <div id='pics-container'>
        {
          images.map((e, i) => <div key={`social-image-${i}`} className='images-block' style={{backgroundImage: `url(${e})`}}>
            <div className='delete-shadow' onClick={() => deleteImage(e).then(({id}) => onDelete(`https://usercontent-davidsdevel-lettercms.vercel.app/${blog.subdomain}/${id}.webp`))}>
              <Cross width='48'/>
            </div>
          </div>)
        }
        <div className='no-images images-block' onClick={onAdd}>
          <FaPlus width='48' fill='#ccd7ec'/>
        </div>
      </div>
    </div>
    <style jsx>{`
      span {
        color: var(--main-alt);
        font-weight: bold;
      }
      #images-upload-container {
        margin-bottom: 1rem;
      }
      #scrollbar {
        overflow: auto;
        width: 100%;
        scrollbar-width: thin;
        scrollbar-color: white #fff3;
      }
      #pics-container {
        width: max-content;
        display: flex;
        padding-bottom: .5rem;
      }
      .images-block {
        width: 5rem;
        height: 5rem;
        border-radius: .5rem;
        cursor: pointer;
        display: inline-block;

        background-size: cover;
        background-position: center;
        margin-right: .5rem;
        overflow: hidden;
      }
      .images-block .delete-shadow {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        opacity: 0;
        transition: ease .3s;
        display:flex;
        align-items: center;
        justify-content: center;
      }
      .images-block:hover .delete-shadow {
        opacity: 1;
      }
      .no-images {
        background: #f7f7f7;
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
      
    `}</style>
  </div>;
};

export default ImageList;
