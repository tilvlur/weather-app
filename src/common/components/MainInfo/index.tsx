import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectWeather } from "../../../features/weather/weatherSlice";
import styles from "./MainInfo.module.scss";
import {
  savePlace,
  selectCanSavePlace,
} from "../../../features/geocoding/geocodingSlice";
import WeatherIcon from "../WeatherIcon";

function MainInfo() {
  const dispatch = useAppDispatch();

  const {
    cityName,
    state,
    country,
    current: currentWeather,
  } = useAppSelector(selectWeather);
  const canSavePlace = useAppSelector(selectCanSavePlace);

  const renderCityName = cityName ? <span>{cityName}, </span> : null;
  const renderState = state ? <span>{state}, </span> : null;
  const renderCountry = country ? <span>{country}</span> : null;

  const { temp, windSpeed, weatherDescription } = currentWeather;
  const { description: weather, icon, main } = weatherDescription;

  const renderWeatherIcon =
    icon && main ? <WeatherIcon icon={icon} alt={main} /> : null;

  const onBtnClickHandle = () => {
    dispatch(savePlace());
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        disabled={!canSavePlace}
        className={styles.saveBtn}
        onClick={onBtnClickHandle}
      >
        <span>Save</span>
        <span> place</span>
      </button>
      <div className={styles.main}>
        {renderWeatherIcon}
        <div className={styles.temp}>{temp} °C</div>
      </div>
      <div className={styles.location}>
        {renderCityName}
        {renderState}
        {renderCountry}
      </div>
      <div className={styles.weatherDescription}>
        <span>{weather}, </span>
        <span>Wind - {windSpeed}m/s</span>
      </div>
    </div>
  );
}

export default memo(MainInfo);
