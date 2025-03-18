import styles from './header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <Menu />
    </div>
  );
}

function Menu() {
  return (
    <div className={styles.menu}>
      Меню
    </div>
  );
}

function Logo() {
  return (
    <div className={styles.logo}>
      Лого
    </div>
  );
}
