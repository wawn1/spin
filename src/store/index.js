import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import {reducer as homeReducer} from "../containers/Home/store";
import axios from "axios";

const serverInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const clientInstance = axios.create({
  baseURL: "/",
});

const reducer = combineReducers({
  home: homeReducer,
});

export const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverInstance)));
};

export const getClientStore = () => {
  const defaultState = window.context.state;
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientInstance)));
};
