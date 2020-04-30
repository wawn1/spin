import axios from "axios";
import {changeName} from "./actionCreators";

export const getNewName = () => {
  return (dispatch) => {
    return axios.get("http://localhost:3000/name").then((res) => {
      dispatch(changeName(res.data.name));
    });
  };
};
