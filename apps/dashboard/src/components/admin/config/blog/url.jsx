const BlogUrl = ({onChange, urlID, categories}) => <div>
  <div className="selection">
    <input type="radio" onChange={onChange} name="urlID" value="1" id="1" checked={urlID == 1} />
    <label htmlFor="1" className="option">/:title</label>
  </div>
  {
    categories?.length > 0
    && <div className="selection">
      <input type="radio" onChange={onChange} name="urlID" value="2" id="2" checked={urlID == 2} />
      <label htmlFor="2" className="option">/:category/:title</label>
    </div>
  }
  <div className="selection">
    <input type="radio" onChange={onChange} name="urlID" value="3" id="3" checked={urlID == 3} />
    <label htmlFor="3" className="option">/:year/:month/:title</label>
  </div>
  <div className="selection">
    <input type="radio" onChange={onChange} name="urlID" value="4" id="4" checked={urlID == 4} />
    <label htmlFor="4" className="option">/:year/:month/:day/:title</label>
  </div>
</div>;

export default BlogUrl;