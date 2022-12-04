import {content} from './content.module.css';


export default function Content({html}) {
  return <div className='w-full container flex justify-center lg:w-2/3'>
    <main
      className={content}
      dangerouslySetInnerHTML={{__html: html}}
    />
  </div>
}
