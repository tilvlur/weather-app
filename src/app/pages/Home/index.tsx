import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../../common/hooks/hooks";
import { selectWeather } from "../../../features/weather/weatherSlice";
import styles from "./Home.module.scss";
import {
  saveSelectedPlace,
  selectCanSavePlace,
} from "../../../features/geocoding/geocodingSlice";

function Home() {
  const dispatch = useAppDispatch();

  const {
    cityName,
    state,
    country,
    current: currentWeather,
  } = useAppSelector(selectWeather);
  const canSavePlace = useAppSelector(selectCanSavePlace);

  const { temp, windSpeed, weatherDescription } = currentWeather;
  const { description: weather, icon: iconAppend } = weatherDescription;
  const imgSrc = `http://openweathermap.org/img/wn/${iconAppend}@2x.png`;

  const onBtnClickHandle = () => {
    dispatch(saveSelectedPlace());
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        disabled={!canSavePlace}
        className={styles.saveBtn}
        onClick={onBtnClickHandle}
      >
        Save place
      </button>
      <div className={styles.main}>
        <div className={styles.imgContainer}>
          <img src={imgSrc} alt="weather icon" />
        </div>
        <div className={styles.temp}>{temp} °C</div>
      </div>
      <div className={styles.location}>
        <span>{cityName}, </span>
        <span>{state}, </span>
        <span>{country}</span>
      </div>
      <div className={styles.weatherDescription}>
        <span>span{weather}, </span>
        <span>Wind - {windSpeed}m/s</span>
      </div>
    </div>
  );
}

export default memo(Home);
