import {CHANGE_NAME} from "./constants";

export const changeName = (name) => ({
  type: CHANGE_NAME,
  name,
});
