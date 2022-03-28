import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  selectWeatherStatus,
} from "../features/weather/weatherSlice";
import { reverseGeolocationQuery } from "../features/geocoding/geocodingSlice";
import Home from "./pages/Home";
import Today from "./pages/Today";
import RequestLC from "../common/components/RequestLC";

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
      batch(() => {
        dispatch(reverseGeolocationQuery());
        dispatch(fetchWeatherData());
      });
  }, [dispatch, geolocationStatus, weatherStatus]);

  return (
    <Router>
      <div className={styles.container}>
        <Header />
        {weatherStatus === "succeeded" ? (
          <main className={styles.content}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="today" element={<Today />} />
              <Route path="*" element={<RequestLC variant="404" />} />
            </Routes>
          </main>
        ) : (
          <RequestLC variant={weatherStatus} />
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
