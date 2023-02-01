import {useState, useEffect} from 'react';
import {useIntl} from 'react-intl';
import {inputTag, tagsContainer, tagList, blogTagsStyles, tagUl} from './tags.module.css';
import {useData} from './index';

export default function Tags({blogTags: _bt}) {
  const [blogTags, setBlogTags] = useState(_bt || []);
  const [text,  setText] = useState('');
  const [showTags, setShowTags] = useState(false);

  const[data, setData] = useData();
  const intl = useIntl();

  useEffect(() => {
    if (!text) {
      setShowTags(false);
    } else {
      const newTags = _bt.filter(e => e.startsWith(text));

      setBlogTags(newTags);
      setShowTags(newTags.length === 0 ? false : true);
    }

  }, [text, _bt]);

  return <div className={tagsContainer}>
    {
      showTags &&
      <div className={blogTagsStyles}>
        <ul>
          {
            blogTags.filter(t => !data.tags.includes(t)).map(e => <li key={e} onClick={() => {
              setData('tags', [...data.tags, e]);
              setText('');
          }}>{e}</li>)
          }
        </ul>
      </div>
    }
    <ul className={tagUl}>
      <li>
        <input
          onKeyUp={({key}) => {
            if (key === 'Enter' && text) {
              setData('tags', [...data.tags, text]);
              setText('');
            }
          }}
          disabled={data.loading}
          onBlur={() => setTimeout(() => setShowTags(false), 0)}
          className={inputTag}
          placeholder={
            intl.formatMessage({
              id: 'Tag'
            })
          }
          value={text}
          onChange={({target: {value}}) => setText(value)}
        />
      </li>
      {
        data.tags?.map((e, i) => <li key={e + i} className={tagList} onClick={() => setData('tags', data.tags.filter(t => t !== e))}>{e}</li>)
      }
    </ul>
  </div>;
}