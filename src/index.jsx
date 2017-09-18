import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Calendar from "./components/Calendar.jsx";
import rootReducers from "./rootReducer";

let store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Calendar />
  </Provider>,
  document.getElementById("react-root")
);
