import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 Mauricio Martinez. Todos los derechos reservados.</p>
      <nav className={styles.nav}>
        <p>Política de Privacidad.</p>
        <p>Términos y Condiciones.</p>
      </nav>
    </footer>
  );
};

export default Footer;
