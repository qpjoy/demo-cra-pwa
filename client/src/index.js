import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "@/utils/libs/amfe-flexible";
// import * as serviceWorker from "./serviceWorker";
import * as customSW from "./customSW";

ReactDOM.render(
  <>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </>,
  document.getElementById("root"),
);

setTimeout(() => {
  fetch("https://httpbin.org/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ message: "Does this work?" }),
  })
    .then(function(response) {
      console.log(response);

      return response.json();
    })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    });
}, 3000);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
customSW.register();
