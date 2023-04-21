import {useRouter} from 'next/router';
import {FaEye, FaTrash} from 'react-icons/fa';
import styles from './card.module.css';

const Card = ({
  _id,
  photo,
  name,
  lastname,
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
            <FaEye height='22'/>
          </div>
          <div className={styles.cardIcon} onClick={() => del(_id)}>
            <FaTrash height='22'/>
          </div>
        </div>
      </div>
    </div>
  </li>;
};

export default Card;
