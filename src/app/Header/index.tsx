import { memo } from "react";
import styles from "./Header.module.scss";
import Navigation from "./Navigation";
import AutocompleteInput from "../../features/geocoding/AutocompleteInput";

function Header() {
  return (
    <header className={styles.container}>
      <Navigation />
      <AutocompleteInput />
    </header>
  );
}

export default memo(Header);
