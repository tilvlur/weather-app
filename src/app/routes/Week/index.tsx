import { memo } from "react";
import { addDays, format } from "date-fns";
import MainInfo from "../../../common/components/MainInfo";
import styles from "./Week.module.scss";
import { useAppSelector } from "../../../common/hooks/hooks";
import { selectWeather } from "../../../features/weather/weatherSlice";
import WeatherIcon from "../../../common/components/WeatherIcon";
import { sentenceCapitalizer } from "../../../common/utils/sentenceCapitalizer";

function Week() {
  const { daily } = useAppSelector(selectWeather);
  // Т.к. данные начинаются с текущего дня
  const weekData = daily.slice(1);
  const fromToDate = `${format(addDays(new Date(), 1), "MMMM, dd")} - ${format(
    addDays(new Date(), 7),
    "MMMM, dd",
  )}`;

  const renderWeekData =
    weekData.length > 0 ? (
      <div className={styles.content}>
        {weekData.map((w) => {
          const { time, weatherDescription, temp } = w;
          const { icon, main, description } = weatherDescription;
          const { day, night } = temp;

          const canRender =
            time &&
            weatherDescription &&
            temp &&
            icon &&
            main &&
            description &&
            day &&
            night;

          const upperCasedDescription =
            description && sentenceCapitalizer(description);

          return canRender ? (
            <div key={time} className={styles.card}>
              <div className={styles.cardHeading}>
                {format(new Date(time), "EEEE")}
              </div>
              <div className={styles.cardIcon}>
                <WeatherIcon icon={icon} alt={main} size={70} />
              </div>
              <div className={styles.description}>{upperCasedDescription}</div>
              <div className={styles.day}>
                <span>Day: </span>
                {day} °C
              </div>
              <div className={styles.night}>Night: {night} °C</div>
            </div>
          ) : null;
        })}
      </div>
    ) : null;

  return (
    <>
      <MainInfo />
      <div className={styles.container}>
        <div className={styles.heading}>Week</div>
        <div>{fromToDate}</div>
        {renderWeekData}
      </div>
    </>
  );
}

export default memo(Week);
