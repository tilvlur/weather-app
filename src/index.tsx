import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app/App";
import store from "./app/store";
import RequestLC from "./common/components/RequestLC";
import Home from "./app/routes/Home";
import Today from "./app/routes/Today";
import Tomorrow from "./app/routes/Tomorrow";
import Week from "./app/routes/Week";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path=":city" element={<Home />} />
            <Route path=":city/today" element={<Today />} />
            <Route path=":city/tomorrow/" element={<Tomorrow />} />
            <Route path=":city/week/" element={<Week />} />
            <Route path="*" element={<RequestLC variant="404" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
