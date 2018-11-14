import React from "react";
import ReactDOM from "react-dom";
import rootReducer from "./reducers/balance";
import App from "./components/App";

import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
