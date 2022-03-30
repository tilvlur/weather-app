import React, { memo, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { batch } from "react-redux";
import styles from "./App.module.scss";
import Header from "./Header";
import Footer from "./Footer";
import {
  getUserGeolocation,
  selectGeolocationStatus,
} from "../features/geolocation/geolocationSlice";
import { useAppDispatch, useAppSelector } from "../common/hooks/hooks";
import {
  fetchWeatherData,
  selectWeather,
  selectWeatherStatus,
} from "../features/weather/weatherSlice";
import { reverseGeolocationQuery } from "../features/geocoding/geocodingSlice";
import RequestLC from "../common/components/RequestLC";

type Params = {
  city?: string;
};

function App() {
  const dispatch = useAppDispatch();
  const geolocationStatus = useAppSelector(selectGeolocationStatus);
  const weatherStatus = useAppSelector(selectWeatherStatus);
  const { cityLink } = useAppSelector(selectWeather);
  const navigate = useNavigate();
  const params = useParams<Params>();

  useEffect(() => {
    // Получаем координаты пользователя
    if (geolocationStatus === "idle") dispatch(getUserGeolocation());

    // Получаем данные о погоде
    if (
      geolocationStatus !== "idle" &&
      geolocationStatus !== "loading" &&
      weatherStatus === "idle"
    ) {
      batch(() => {
        dispatch(reverseGeolocationQuery());
        dispatch(fetchWeatherData());
      });
    }

    // Если данные о погоде есть, то добавляем к пути название места
    if (cityLink && cityLink !== params.city) {
      navigate(`/${cityLink}`);
    }
  }, [
    cityLink,
    dispatch,
    geolocationStatus,
    navigate,
    params,
    params.city,
    weatherStatus,
  ]);

  return (
    <div className={styles.container}>
      <Header />
      {weatherStatus === "succeeded" ? (
        <main className={styles.content}>
          <Outlet />
        </main>
      ) : (
        <RequestLC variant={weatherStatus} />
      )}
      <Footer />
    </div>
  );
}

export default memo(App);
