import styles from "./NotFound.module.scss";

function NotFound() {
  return (
    <div className={styles.notFound}>
      <div>Error 404</div>
      <div className={styles.description}>There nothing here...</div>
    </div>
  );
}

export default NotFound;
