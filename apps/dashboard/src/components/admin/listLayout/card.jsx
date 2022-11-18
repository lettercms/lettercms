import {useState} from 'react';
import {useUser} from '@/components/layout';
import Eye from '@/components/svg/eye';
import Preview from '@/components/svg/preview';
import Edit from '@/components/svg/edit';
import Bubbles from '@/components/svg/bubbles';
import Trash from '@/components/svg/trash';
import LinkSvg from '@/components/svg/link';
import styles from './card.module.css';
import TagList from './tagList';

const Card = ({
  _id,
  thumbnail,
  title,
  tags,
  comments,
  views,
  postStatus,
  pageStatus,
  url,
  fullUrl,
  isProtected,
  author,
  edit,
  del
}) => {
  const [tagsOpen, setTagsOpen] = useState(false);

  const {blog, user} = useUser();

  const canDelete = user.role === 'admin' || user._id === author._id;
  const canEdit = !isProtected || user._id === author._id || user.role === 'admin';

  return <li className={styles.post} key={`post-${_id}`}>
    {
      thumbnail
      ? <div className={styles.image} style={{ backgroundImage: `url(${thumbnail}&h=280&q=50)` }} />
      : <div className={styles.imageTitle}>{!title ? 'N' : title[0].toUpperCase()}</div>
    }
    <div className={styles.data}>
      <div className={styles.postTitle}>
        <span>{title ? title : postStatus ? '(Nueva Entrada)' : '(Nueva Pagina)'}</span>
        {
          author &&
          <img src={`${author.photo}&w=36&q=50`} className={styles.authorPicture} alt=''/>
        }
      </div>
      <div className={styles.tags}>
        {
          tags?.length > 0 &&
          <>
            <span className={styles.tag}>{tags[0]}</span>
            {
              tags.length > 1 &&
              <button className={styles.tag} onClick={() => setTagsOpen(!tagsOpen)} onBlur={() => setTagsOpen(false)}>{`+${tags.length - 1}`}</button>
            }
          </>
        }
      </div>
      <div className={styles.buttons}>
        <div className={styles.viewsContainer}>
          {
            !pageStatus &&
            <div className={styles.align}>
              <Bubbles height='22'/>
              <span>{comments}</span>
            </div>
          }
          <div className={styles.align}>
            <Eye height='22'/>
            <span>{views}</span>
          </div>
        </div>
        <div>
          
          {
            postStatus === 'published' &&
            <div className={styles.cardIcon} onClick={() => window.open(`https://${blog.domain}${fullUrl}`, '_blank')}>
              <LinkSvg height='22'/>
            </div>
            }
            {
            postStatus === 'draft' &&

            <div className={styles.cardIcon} onClick={() => window.open(`https://${blog.domain}/api/preview?id=${_id}`, '_blank')}>
              <Preview height='22'/>
            </div>
          }
          {
            pageStatus === 'published' &&
            <div className={styles.cardIcon} onClick={() => window.open(`https://${blog.domain}/${url}`, '_blank')}>
              <LinkSvg height='22'/>
            </div>
          }
          {
            canEdit &&
            <div className={styles.cardIcon} onClick={() => edit(_id)}>
              <Edit height='22'/>
            </div> 
          }
          {
            canDelete &&
            <div className={styles.cardIcon} onClick={() => del(_id)}>
              <Trash height='22'/>
            </div>
          }
        </div>
      </div>
    </div>
    {
      tagsOpen &&
      <TagList tags={tags.slice(1)}/>
    }
  </li>;
};

export default Card;
