import {FormattedMessage} from 'react-intl';

const BlogUrl = ({onChange, urlID, categories}) => <div>
  <div className="selection">
    <input type="radio" onChange={onChange} name="url" value="1" id="1" checked={urlID == 1} />
    <label htmlFor="1" className="option">
      <span>
        <FormattedMessage id='/:title'/>
      </span>
    </label>
  </div>
  {
    categories?.length > 0
    && <div className="selection">
      <input type="radio" onChange={onChange} name="url" value="2" id="2" checked={urlID == 2} />
      <label htmlFor="2" className="option">
        <span>
          <FormattedMessage id='/:category/:title'/>
        </span>
      </label>
    </div>
  }
  <div className="selection">
    <input type="radio" onChange={onChange} name="url" value="3" id="3" checked={urlID == 3} />
    <label htmlFor="3" className="option">
      <span>
        <FormattedMessage id='/:year/:month/:title'/>
      </span>
    </label>
  </div>
  <div className="selection">
    <input type="radio" onChange={onChange} name="url" value="4" id="4" checked={urlID == 4} />
    <label htmlFor="4" className="option">
      <span>
        <FormattedMessage id='/:year/:month/:date/:title'/>
      </span>
    </label>
  </div>
</div>;

export default BlogUrl;
