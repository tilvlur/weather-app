import { memo } from "react";
import classNames from "classnames";
import { UserSelectionItem } from "../../../../../features/geocoding/types";
import styles from "./PlaceCard.module.scss";
import { useAppDispatch } from "../../../../../common/hooks/hooks";
import { setUserSelectedLocation } from "../../../../../features/geocoding/geocodingSlice";
import { fetchWeatherData } from "../../../../../features/weather/weatherSlice";

interface PlaceCardProps extends UserSelectionItem {
  isActive: boolean;
}

function PlaceCard({
  id,
  placeNameForRender,
  placeName,
  lat,
  lon,
  isActive,
}: PlaceCardProps) {
  const dispatch = useAppDispatch();

  const onCardClickHandle = () => {
    if (id && placeName && lat && lon) {
      dispatch(setUserSelectedLocation({ id, placeName, lat, lon }));
      dispatch(fetchWeatherData());
    }
  };

  const placeCardStyle = classNames(styles.container, {
    [styles.container__active]: isActive,
  });

  return (
    <button
      type="button"
      key={id}
      className={placeCardStyle}
      onClick={onCardClickHandle}
      disabled={isActive}
    >
      <div className={styles.content}>
        <div className={styles.city}>{placeNameForRender.cityName}</div>
        <div className={styles.stateCountry}>
          <div>{placeNameForRender.state}</div>
          <div>{placeNameForRender.country}</div>
        </div>
        <div className={styles.address}>Адрес: {placeName}</div>
      </div>
    </button>
  );
}

export default memo(PlaceCard);
