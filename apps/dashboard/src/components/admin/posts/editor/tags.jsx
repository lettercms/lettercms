import {useState, useEffect} from 'react';
import {inputTag, tagsContainer, tagList, blogTagsStyles, tagUl} from './tags.module.css';

export default function Tags({tags: _t, blogTags: _bt, onChange}) {

  const [tags,  setTags] = useState(_t ? _t : []);
  const [blogTags, setBlogTags] = useState(_bt || []);
  const [text,  setText] = useState('');
  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    if (!text) {
      setShowTags(false);
    } else {
      const newTags = _bt.filter(e => e.startsWith(text));

      setBlogTags(newTags)
      setShowTags(newTags.length === 0 ? false : true);
    }

  }, [text, _bt])

  return <div className={tagsContainer}>
    {
      showTags &&
      <div className={blogTagsStyles}>
        <ul>
          {
            blogTags.map(e => <li key={e}>{e}</li>)
          }
        </ul>
      </div>
    }
    <ul className={tagUl}>
      <li>
          <input onBlur={() => setShowTags(false)} className={inputTag} placeholder='Etiqueta' value={text} onChange={({target: {value}}) => setText(value)}/>
      </li>
      {
        tags.map((e, i) => <li key={e + i} className={tagList}>{e}</li>)
      }
    </ul>
  </div>
}