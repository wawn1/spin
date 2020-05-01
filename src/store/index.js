import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import {reducer as homeReducer} from "../containers/Home/store";
import axios from "axios";

const createServerInstance = (req) =>
  axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      cookie: req.get("cookie") || "",
    },
  });

const clientInstance = axios.create({
  baseURL: "/",
});

const reducer = combineReducers({
  home: homeReducer,
});

export const getServerStore = (req) => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(createServerInstance(req))));
};

export const getClientStore = () => {
  const defaultState = window.context.state;
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientInstance)));
};
