import {main, image, text, contentLoad} from './cardLoad.module.css';

export default function CardLoad() {
  return <li className={main}>
    <div className={image}/>
    <div className={text}>
      <div/>
      <div className={contentLoad}/>
    </div>
  </li>;
}
