import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
//CSS

import rootReducers from "./reducers/action";

//store
const store = createStore(rootReducers, composeWithDevTools());
ReactDOM.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>,
  document.getElementById("root")
);
