import Trash from '@lettercms/icons/trash';
import {useRouter} from 'next/router';
import Eye from '@lettercms/icons/eye';
import styles from './card.module.css';

const Card = ({
  _id,
  photo,
  name,
  lastname,
  url,
  fullUrl,
  del
}) => {
  const router = useRouter();

  return <li className={styles.post} key={`post-${_id}`}>
    {
      photo
      ? <div className={styles.image} style={{ backgroundImage: `url(${photo})` }} />
      : <div className={styles.imageTitle}>{(name[0].toUpperCase() + lastname[0].toUpperCase()) || 'Nombre'}</div>
    }
    <div className={styles.data}>
      <div className={styles.postTitle}>
        <span>{name} {lastname}</span>
      </div>
      <div className={styles.buttons}>
        <div/>
        <div>
          <div className={styles.cardIcon} onClick={() => router.push(`/dashboard/collaborators/${_id}`)}>
            <Eye height='22'/>
          </div>
          <div className={styles.cardIcon} onClick={() => del(_id)}>
            <Trash height='22'/>
          </div>
        </div>
      </div>
    </div>
  </li>;
};

export default Card;
