import styles from "./Sidebar.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; CopyRights {new Date().getFullYear()} By WorldWise Inc .
      </p>
    </footer>
  );
}
