import { memo } from "react";
import styles from "./RequestLC.module.scss";

interface RequestLCProps {
  variant: "idle" | "loading" | "failed" | "404" | "autoSearchFailed";
}

function Loading() {
  return <div className={styles.container}>Loading...</div>;
}

function Failed() {
  return (
    <div className={styles.container}>
      <div>No data for this place</div>
      <div className={styles.description}>
        Please try to choose another location, or check connection.
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className={styles.container}>
      <div>Error 404</div>
      <div className={styles.description}>There&apos;s nothing here...</div>
    </div>
  );
}

function ManualSearch() {
  return (
    <div className={styles.container}>
      <div>Couldn&apos;t determine your location</div>
      <div className={styles.description}>
        Please use the search to get the weather forecast for the selected
        location
      </div>
    </div>
  );
}

function RequestLC({ variant }: RequestLCProps) {
  switch (variant) {
    case "idle":
      return <Loading />;
    case "loading":
      return <Loading />;
    case "failed":
      return <Failed />;
    case "404":
      return <NotFound />;
    case "autoSearchFailed":
      return <ManualSearch />;
    default:
      return null;
  }
}

export default memo(RequestLC);
