const Tags = ({data, removeTag}) => <ul id='tags'>
  {data.map((e,i) => {
    return <li key={e+i} onClick={() => removeTag(i)}>{e}</li>;
  })}
  <style jsx>{`
    #tags {
      margin-top: 15px;
    }
    #tags li {
      list-style: none;
      margin: 5px 0;
      border: 1px #5f4dee solid;
      padding: 5px 0;
      color: #5f4dee;
      text-align: center;
      border-radius: 50px;
      cursor: pointer;
    }
  `}</style>
</ul>;

export default Tags;
