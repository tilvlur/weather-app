import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./Header";
import Footer from "./Footer";
import NotFound from "./NotFound404/NotFound";
import {
  getBrowserGeolocation,
  getGeolocationFromWeb,
  selectBrowserGeoStatus,
} from "../features/geolocation/geolocationSlice";
import { useAppDispatch, useAppSelector } from "../common/hooks/hooks";

function App() {
  const dispatch = useAppDispatch();
  const browserGeoStatus = useAppSelector(selectBrowserGeoStatus);

  // Получаем координаты пользователя
  useEffect(() => {
    // Если пользователь не разрешил получить координаты, пробуем
    // получить из api, если и из api не получится, то оставляем
    // координаты по умолчанию
    if (browserGeoStatus === "idle") {
      dispatch(getBrowserGeolocation());
    } else if (browserGeoStatus === "failed") {
      dispatch(getGeolocationFromWeb());
    }
  }, [browserGeoStatus, dispatch]);

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
