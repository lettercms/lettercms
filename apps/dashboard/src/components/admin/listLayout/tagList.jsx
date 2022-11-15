import {useEffect, useRef} from 'react';

import {tag} from './card.module.css';
import {tagList} from './tagList.module.css';

export default function TagList({tags}) {
  const r = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      r.current.style.opacity = 1;
    }, 0);
  }, []);

  return <div className={tagList} ref={r}>
    <ul>
      {
        tags.map(e => <li className={tag} key={e}>{e}</li>)
      }
    </ul>
  </div>;
}