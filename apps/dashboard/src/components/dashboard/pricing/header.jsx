import styles from './header.module.css';

function Header() {
  return <div className={styles.header}>
    <h1>Planes de precios</h1>
    <h2>Comienza tu plan gratuito, y pagas los recursos que uses demás</h2>
  </div>;
}

export default Header;
