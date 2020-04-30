import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter} from "react-router-dom";
import Routes from "../routers";
import {Provider} from "react-redux";
import {getClientStore} from "../store";

const store = getClientStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>{Routes}</BrowserRouter>
    </Provider>
  );
};

ReactDom.hydrate(<App />, document.getElementById("root"));
