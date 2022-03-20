import { memo } from "react";
import styles from "./Header.module.scss";
import Navigation from "./Navigation";
import Search from "./Search";

function Header() {
  return (
    <header className={styles.container}>
      <Navigation />
      <Search />
    </header>
  );
}

export default memo(Header);
