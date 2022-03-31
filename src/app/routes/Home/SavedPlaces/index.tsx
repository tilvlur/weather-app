import { memo } from "react";
import classNames from "classnames";
import styles from "./SavedPlaces.module.scss";
import {
  selectSavedPlaces,
  selectUserSelection,
} from "../../../../features/geocoding/geocodingSlice";
import { useAppSelector } from "../../../../common/hooks/hooks";
import PlaceCard from "./PlaceCard";

function SavedPlaces() {
  const savedPlaces = useAppSelector(selectSavedPlaces);
  const userSelection = useAppSelector(selectUserSelection);
  const isSavedPlaces = savedPlaces.length > 0;

  const headingStyle = classNames(styles.heading, {
    [styles.heading__faded]: !isSavedPlaces,
  });
  const renderHeading = isSavedPlaces ? (
    <div className={headingStyle}>Saved Places</div>
  ) : (
    <div className={headingStyle}>Saved places will be below...</div>
  );

  const renderSavedPlaces = isSavedPlaces ? (
    <div className={styles.placeCards}>
      {savedPlaces.map((p) => (
        <PlaceCard isActive={p.id === userSelection!.id} key={p.id} {...p} />
      ))}
    </div>
  ) : null;

  return (
    <div className={styles.container}>
      {renderHeading}
      {renderSavedPlaces}
    </div>
  );
}

export default memo(SavedPlaces);
