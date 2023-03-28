import {load, top, title} from './editorLoad.module.css';

export default function EditorLoad() {
  return <div className={load}>
    <div className={top}/>
    <div className={title}/>
    <div/>
    <div/>
  </div>;
}