import { memo } from "react";
import styles from "./WeatherIcon.module.scss";

interface WeatherIconProps {
  icon: string;
  alt: string;
  size?: number;
  border?: number;
}

function WeatherIcon({ icon, alt, size = 55, border = 2 }: WeatherIconProps) {
  const imgSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div
      className={styles.container}
      style={{ width: size, height: size, borderWidth: border }}
    >
      <img src={imgSrc} alt={alt} />
    </div>
  );
}

export default memo(WeatherIcon);
