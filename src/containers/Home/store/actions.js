import {changeName} from "./actionCreators";

export const getNewName = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get("/name").then((res) => {
      dispatch(changeName(res.data.name));
    });
  };
};
