import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./Header";
import Footer from "./Footer";
import NotFound from "./NotFound404/NotFound";
import {
  getUserGeolocation,
  selectGeolocationStatus,
} from "../features/geolocation/geolocationSlice";
import { useAppDispatch, useAppSelector } from "../common/hooks/hooks";
import {
  fetchWeatherData,
  selectWeatherStatus,
} from "../features/weather/weatherSlice";

function App() {
  const dispatch = useAppDispatch();
  const geolocationStatus = useAppSelector(selectGeolocationStatus);
  const weatherStatus = useAppSelector(selectWeatherStatus);

  useEffect(() => {
    // Получаем координаты пользователя
    if (geolocationStatus === "idle") dispatch(getUserGeolocation());

    // Получаем данные о погоде
    if (
      geolocationStatus !== "idle" &&
      geolocationStatus !== "loading" &&
      weatherStatus === "idle"
    )
      dispatch(fetchWeatherData());
  }, [dispatch, geolocationStatus, weatherStatus]);

  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <main className={styles.content}>
          <Routes>
            <Route path="/" element={<div>Weather App</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
