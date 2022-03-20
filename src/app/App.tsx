import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import Home from "../screens/Home";
import TodayScreen from "../screens/Today";
import WeekScreen from "../screens/Week";
import NotFoundScreen from "../screens/404";
import Header from "./Header";
import Footer from "./Footer";
import TomorrowScreen from "../screens/Tomorrow";
import { Routs } from "./types";

function App() {
  const routs: Routs = [
    { path: "/", element: <Home /> },
    { path: "today", element: <TodayScreen /> },
    { path: "tomorrow", element: <TomorrowScreen /> },
    { path: "week", element: <WeekScreen /> },
    { path: "*", element: <NotFoundScreen /> },
  ];

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>
        <Routes>
          {routs.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default memo(App);
