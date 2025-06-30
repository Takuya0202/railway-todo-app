import React, { StrictMode } from "react";
// import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/index";
import axios from "~/vendor/axios";
import { createRoot } from "react-dom/client";

axios.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// const root = document.getElementById('root')
// ReactDOM.render(
//   <StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </StrictMode>,
//   root,
// )

// 書き換え
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* reduxのstoreを使えるようにする。 */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
