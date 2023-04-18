import {useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {useUser} from '@/components/dashboard/layout';
import {FaEye, FaTrash, FaExternalLinkAlt, FaComments, FaEdit} from 'react-icons/fa';
import {MdPreview} from 'react-icons/md';
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
        <span>{title ? title : postStatus ? <FormattedMessage id='(New Post)'/> : <FormattedMessage id='(New Page)'/>}</span>
        {
          author &&
          <img src={`${author.photo}?h=36&w=36&q=25`} className={styles.authorPicture} alt=''/>
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
              <FaComments height='22'/>
              <span>{comments}</span>
            </div>
          }
          <div className={styles.align}>
            <FaEye height='22'/>
            <span>{views}</span>
          </div>
        </div>
        <div>
          
          {
            (postStatus === 'published' || pageStatus === 'published') &&
            <div className={styles.cardIcon} onClick={() => window.open(`https://${blog.domain}${fullUrl}`, '_blank')}>
              <FaExternalLinkAlt height='22'/>
            </div>
          }
          {
            postStatus === 'draft' &&

            <div className={styles.cardIcon} onClick={() => window.open(`https://${blog.domain}/api/preview?id=${_id}`, '_blank')}>
              <MdPreview height='22'/>
            </div>
          }
          {
            canEdit &&
            <div className={styles.cardIcon} onClick={() => edit(_id)}>
              <FaEdit height='22'/>
            </div> 
          }
          {
            canDelete &&
            <div className={styles.cardIcon} onClick={() => del(_id)}>
              <FaTrash height='22'/>
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
