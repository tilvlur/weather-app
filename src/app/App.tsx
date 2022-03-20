import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultScreen from "../screens/Default";
import TodayScreen from "../screens/Today";
import WeekScreen from "../screens/Week";
import NotFoundScreen from "../screens/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultScreen />} />
        <Route path="today" element={<TodayScreen />} />
        <Route path="week" element={<WeekScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
