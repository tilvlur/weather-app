import { format } from "date-fns";
import styles from "./TodayDetails.module.scss";
import { selectWeather } from "../../../../features/weather/weatherSlice";
import WeatherIcon from "../../../../common/components/WeatherIcon";
import Map from "../../../../common/components/Map";
import { useAppSelector } from "../../../../common/hooks/hooks";
import { selectUserSelection } from "../../../../features/geocoding/geocodingSlice";
import { GeocodingDALobj } from "../../../../features/geocoding/api/types";
import { sentenceCapitalizer } from "../../../../common/utils/sentenceCapitalizer";

function TodayDetails() {
  const { hourly } = useAppSelector(selectWeather);
  const { lat, lon } = useAppSelector(selectUserSelection) as GeocodingDALobj;
  const { icon: markerIcon, description: weather } =
    hourly[0].weatherDescription;
  const { temp: temperature, windSpeed: wind } = hourly[0];

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Today</div>
      <div>{format(new Date(), "MMMM, dd")}</div>

      <div className={styles.content}>
        <div className={styles.table}>
          <div className={styles.table_heading}>
            <div className={styles.leftCol}>Time</div>
            <div className={styles.rightCol}>Weather</div>
          </div>
          {hourly
            .map((hw, i) => {
              const { time, temp, windSpeed, weatherDescription } = hw;
              const { description, icon, main } = weatherDescription;
              const canRender =
                time && temp && windSpeed && description && icon && main;
              const hours = (rawTime: string) =>
                format(new Date(rawTime), "HH:mm");
              const upperCasedDescription =
                description && sentenceCapitalizer(description);

              return canRender ? (
                <div key={i} className={styles.table_content}>
                  <div className={styles.leftCol}>{hours(time)}</div>
                  <div className={styles.rightCol}>
                    <WeatherIcon icon={icon} alt={main} size={30} border={1} />
                    <div className={styles.itemDescription}>
                      <span className={styles.temp}>{temp} °C,</span>
                      <span className={styles.description}>
                        {upperCasedDescription},
                      </span>
                      <span className={styles.windSpeed}>
                        Wind - {windSpeed}m/s
                      </span>
                    </div>
                  </div>
                </div>
              ) : null;
            })
            .slice(0, 10)}
        </div>
        <div className={styles.map}>
          <Map
            lat={Number(lat)}
            lon={Number(lon)}
            marker={markerIcon}
            weather={weather ? sentenceCapitalizer(weather) : null}
            temp={temperature}
            wind={wind}
          />
        </div>
      </div>
    </div>
  );
}

export default TodayDetails;
