import { format, addDays } from "date-fns";
import classNames from "classnames";
import styles from "./TomorrowDetails.module.scss";
import { useAppSelector } from "../../../../common/hooks/hooks";
import { selectWeather } from "../../../../features/weather/weatherSlice";
import WeatherIcon from "../../../../common/components/WeatherIcon";
import { sentenceCapitalizer } from "../../../../common/utils/sentenceCapitalizer";
import Map from "../../../../common/components/Map";
import { selectUserSelection } from "../../../../features/geocoding/geocodingSlice";
import { GeocodingDALobj } from "../../../../features/geocoding/api/types";

function TomorrowDetails() {
  const { current, daily } = useAppSelector(selectWeather);
  const { lat, lon } = useAppSelector(selectUserSelection) as GeocodingDALobj;
  const { temp, humidity, windSpeed, weatherDescription } = daily[1];
  const { day, min, max, night, eve, morn } = temp;
  const { main, description, icon } = weatherDescription;
  // For <Map />
  const {
    temp: currentTemp,
    windSpeed: currentWindSpeed,
    weatherDescription: currentWeatherDescription,
  } = current;
  const { description: currentDescription, icon: currentIcon } =
    currentWeatherDescription;

  const canRender =
    humidity &&
    windSpeed &&
    day &&
    min &&
    max &&
    night &&
    eve &&
    morn &&
    main &&
    description &&
    icon;

  const upperCasedDescription = description && sentenceCapitalizer(description);

  const renderDetailedInfo = canRender ? (
    <div className={styles.table}>
      <div className={styles.table_heading}>
        <div className={styles.leftCol}>Weather</div>
        <div className={styles.rightCol}>Temperature</div>
      </div>
      <div className={styles.table_content}>
        <div className={styles.leftCol}>
          <WeatherIcon icon={icon} alt={main} size={70} />
          <div className={styles.description}>
            <div className={styles.main}>{upperCasedDescription}</div>
            <div className={styles.humidity}>
              Humidity - <span>{humidity}%</span>
            </div>
            <div className={styles.windSpeed}>
              Wind - <span>{windSpeed}m/s</span>
            </div>
          </div>
        </div>
        <div className={styles.rightCol}>
          <div className={styles.temperature}>
            <div className={styles.labels}>
              <div className={classNames(styles.label, styles.label__min)}>
                Min:
              </div>
              <div className={classNames(styles.label, styles.label__max)}>
                Max:
              </div>
              <div className={styles.label}>Morning:</div>
              <div className={styles.label}>Day:</div>
              <div className={styles.label}>Evening:</div>
              <div className={styles.label}>Night:</div>
            </div>
            <div className={styles.values}>
              <div className={styles.value}>{min} °C</div>
              <div className={styles.value}>{max} °C</div>
              <div className={styles.value}>{morn} °C</div>
              <div className={styles.value}>{day} °C</div>
              <div className={styles.value}>{eve} °C</div>
              <div className={styles.value}>{night} °C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Tomorrow</div>
      <div>{format(addDays(new Date(), 1), "MMMM, dd")}</div>
      <div className={styles.content}>
        {renderDetailedInfo}
        <div className={styles.map}>
          <Map
            lat={Number(lat)}
            lon={Number(lon)}
            marker={currentIcon}
            weather={
              currentDescription
                ? sentenceCapitalizer(currentDescription)
                : null
            }
            temp={currentTemp}
            wind={currentWindSpeed}
          />
        </div>
      </div>
    </div>
  );
}

export default TomorrowDetails;
